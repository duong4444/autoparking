// tích hợp Zod vs react-hook-form để validate dữ liệu
import { zodResolver } from '@hookform/resolvers/zod'
// hook 
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaRegister } from './schemas'

export type FormTypeRegister = z.infer<typeof formSchemaRegister>

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
  })
