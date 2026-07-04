'use client'

export function ContactForm() {
  return (
    <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nome</label>
          <input className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" placeholder="Seu nome" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">E-mail</label>
          <input type="email" className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60" placeholder="seu@email.com" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Assunto</label>
        <select className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60">
          <option>Suporte técnico</option>
          <option>Financeiro / Faturamento</option>
          <option>Parceria comercial</option>
          <option>Impressa</option>
          <option>Outro</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Mensagem</label>
        <textarea rows={5} className="w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none" placeholder="Como podemos ajudar?" />
      </div>
      <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
        Enviar mensagem
      </button>
    </form>
  )
}
