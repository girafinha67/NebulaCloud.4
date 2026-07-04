import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validatePasswordResetToken, deletePasswordResetToken } from '@/lib/tokens'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { token, password } = parsed.data

    const record = await validatePasswordResetToken(token)
    if (!record) {
      return NextResponse.json(
        { error: 'Link inválido ou expirado. Solicite um novo.' },
        { status: 400 }
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    await prisma.user.update({
      where: { email: record.email },
      data: { password: hashed },
    })

    await deletePasswordResetToken(token)

    return NextResponse.json({ message: 'Senha redefinida com sucesso!' })
  } catch (err) {
    console.error('[reset-password]', err)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
