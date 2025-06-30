import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaLogin } from './schemas'
// connect Zod validation to react-hoook-form
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeLogin = z.infer<typeof formSchemaLogin>

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
  })
