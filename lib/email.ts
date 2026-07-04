import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM ?? 'Nebula <noreply@nebula.app>'
const BASE_URL = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${BASE_URL}/redefinir-senha?token=${token}`

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: 'Redefinição de senha — Nebula',
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:48px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;max-width:100%">
        <tr>
          <td style="padding:40px 40px 32px;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.15))">
            <div style="font-size:28px;font-weight:700;background:linear-gradient(135deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px">☁ Nebula</div>
            <h1 style="color:#f1f5f9;font-size:22px;font-weight:600;margin:0">Redefinição de senha</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px">
            <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px">
              Recebemos uma solicitação para redefinir a senha da sua conta Nebula. Clique no botão abaixo para criar uma nova senha.
            </p>
            <p style="text-align:center;margin:0 0 24px">
              <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:600">Redefinir minha senha</a>
            </p>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px">
              Este link expira em <strong style="color:#94a3b8">1 hora</strong>. Se você não solicitou a redefinição, ignore este e-mail — sua senha permanece a mesma.
            </p>
            <p style="color:#475569;font-size:12px;margin:0;word-break:break-all">
              Ou cole este link no navegador: <span style="color:#818cf8">${resetUrl}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
            <p style="color:#475569;font-size:12px;margin:0">© 2025 Nebula Cloud. Todos os direitos reservados.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `Redefinição de senha — Nebula\n\nClique no link abaixo para redefinir sua senha:\n${resetUrl}\n\nEste link expira em 1 hora. Se você não solicitou isso, ignore este e-mail.`,
  })
}

const CONTACT_TO = process.env.CONTACT_EMAIL_TO ?? process.env.SMTP_USER ?? 'contato@nebula.app'

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const { name, email, subject, message } = data
  const safeMessage = message.replace(/\n/g, '<br />')

  await transporter.sendMail({
    from: FROM,
    to: CONTACT_TO,
    replyTo: email,
    subject: `[Contato] ${subject} — ${name}`,
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:48px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;max-width:100%">
        <tr>
          <td style="padding:40px 40px 32px;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.15))">
            <div style="font-size:28px;font-weight:700;background:linear-gradient(135deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px">☁ Nebula</div>
            <h1 style="color:#f1f5f9;font-size:22px;font-weight:600;margin:0">Nova mensagem de contato</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px">
            <p style="color:#94a3b8;font-size:14px;margin:0 0 6px"><strong style="color:#e2e8f0">Nome:</strong> ${name}</p>
            <p style="color:#94a3b8;font-size:14px;margin:0 0 6px"><strong style="color:#e2e8f0">E-mail:</strong> ${email}</p>
            <p style="color:#94a3b8;font-size:14px;margin:0 0 20px"><strong style="color:#e2e8f0">Assunto:</strong> ${subject}</p>
            <p style="color:#cbd5e1;font-size:15px;line-height:1.6;margin:0;white-space:pre-line">${safeMessage}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
            <p style="color:#475569;font-size:12px;margin:0">© 2025 Nebula Cloud. Todos os direitos reservados.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `Nova mensagem de contato\n\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\n${message}`,
  })
}
