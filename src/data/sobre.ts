/**
 * Conteúdo da seção "sobre": as linhas do terminal e o depoimento.
 *
 * Linhas do terminal:
 *  - 'cmd': comando digitado (prefixo $ azul)
 *  - 'out': resposta normal (prefixo >)
 *  - 'destaque': resposta em azul claro
 */
export type TipoLinha = 'cmd' | 'out' | 'destaque';

export const terminal: ReadonlyArray<{ tipo: TipoLinha; texto: string }> = [
  { tipo: 'cmd', texto: 'asimov --sobre' },
  { tipo: 'out', texto: 'empresa júnior de TI da UNIFEI' },
  { tipo: 'destaque', texto: 'a maior de Minas Gerais' },
  { tipo: 'out', texto: '+120 projetos desde 2018' },
  { tipo: 'out', texto: 'sistemas · apps · sites · dados' },
  { tipo: 'destaque', texto: 'Melhor Case Mundial de Impacto 2026' },
  { tipo: 'cmd', texto: 'asimov --status' },
  { tipo: 'destaque', texto: 'pronto pro seu projeto' },
];

export const depoimento = {
  texto:
    'A comunicação durante o projeto foi impecável, e cada ajuste foi feito com muito cuidado.',
  autor: 'SanFran Jr., cliente',
} as const;
