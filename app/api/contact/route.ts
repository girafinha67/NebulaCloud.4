import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  subject: z.string().min(2, 'Assunto obrigatório'),
  message: z.string().min(10, 'Mensagem muito curta'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    await sendContactEmail(parsed.data)

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso! Responderemos em breve.',
    })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json(
      { error: 'Erro ao enviar a mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}
