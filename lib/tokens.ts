import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

const EXPIRY_MS = 60 * 60 * 1000 // 1 hora

export async function generatePasswordResetToken(email: string) {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + EXPIRY_MS)

  await prisma.passwordResetToken.deleteMany({ where: { email } })

  return prisma.passwordResetToken.create({
    data: { email, token, expires },
  })
}

export async function validatePasswordResetToken(token: string) {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } })
  if (!record) return null
  if (record.expires < new Date()) {
    await prisma.passwordResetToken.delete({ where: { token } })
    return null
  }
  return record
}

export async function deletePasswordResetToken(token: string) {
  await prisma.passwordResetToken.deleteMany({ where: { token } })
}
