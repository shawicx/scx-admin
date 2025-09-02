import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
})

export const loginWithCodeSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  code: z.string().length(6, '验证码必须是6位数字'),
})

export const registerSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  confirmPassword: z.string(),
  code: z.string().length(6, '验证码必须是6位数字'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type LoginWithCodeFormData = z.infer<typeof loginWithCodeSchema>
export type RegisterFormData = z.infer<typeof registerSchema>