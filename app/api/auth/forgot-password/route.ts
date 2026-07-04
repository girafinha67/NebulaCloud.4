import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/email'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    const { email } = parsed.data

    // Always return success to avoid user enumeration
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

    if (user) {
      const { token } = await generatePasswordResetToken(email)
      await sendPasswordResetEmail(email, token)
    }

    return NextResponse.json({
      message: 'Se este e-mail estiver cadastrado, você receberá as instruções em instantes.',
    })
  } catch (err) {
    console.error('[forgot-password]', err)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
