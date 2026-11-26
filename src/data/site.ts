/**
 * Dados gerais da Asimov Jr., usados em várias partes do site.
 * Mude aqui e o site inteiro acompanha.
 */
export const site = {
  name: 'Asimov Jr.',
  description: 'A maior empresa júnior de TI de Minas Gerais. Sites, apps, sistemas e dados.',
  whatsapp: {
    number: '5512988353187',
    display: '(12) 98835-3187',
  },
  email: 'comercial@asimovjr.com.br',
  address: 'Av. BPS, 1303 · Itajubá, MG',
  social: {
    instagram: 'https://www.instagram.com/asimovjr/',
    linkedin: 'https://www.linkedin.com/company/asimovjr/',
  },
} as const;

/** Link do WhatsApp com uma mensagem já escrita. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
