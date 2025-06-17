import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateVerification } from './dtos/create.dto'
import { VerificationQueryDto } from './dtos/query.dto'
import { UpdateVerification } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { VerificationEntity } from './entity/verification.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('verifications')
@Controller('verifications')
export class VerificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VerificationEntity })
  @Post()
  create(@Body() createVerificationDto: CreateVerification, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createVerificationDto.uid)
    return this.prisma.verification.create({ data: createVerificationDto })
  }

  @ApiOkResponse({ type: [VerificationEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: VerificationQueryDto) {
    return this.prisma.verification.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: VerificationEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.verification.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: VerificationEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVerificationDto: UpdateVerification,
    @GetUser() user: GetUserType,
  ) {
    const verification = await this.prisma.verification.findUnique({ where: { id } })
    checkRowLevelPermission(user, verification.uid)
    return this.prisma.verification.update({
      where: { id },
      data: updateVerificationDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const verification = await this.prisma.verification.findUnique({ where: { id } })
    checkRowLevelPermission(user, verification.uid)
    return this.prisma.verification.delete({ where: { id } })
  }
}
