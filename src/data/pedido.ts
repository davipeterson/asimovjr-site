/**
 * A conversa da seção "pedido": o visitante pergunta, a Asimov responde,
 * e o mock correspondente se monta na tela.
 */
export interface EtapaPedido {
  rotulo: string;
  pergunta: string;
  resposta: string;
  tags: string;
}

export const etapas: readonly EtapaPedido[] = [
  {
    rotulo: 'Site',
    pergunta: 'Preciso de um site que venda.',
    resposta: 'A gente faz.',
    tags: 'institucional · landing page · campanha',
  },
  {
    rotulo: 'App',
    pergunta: 'E um app?',
    resposta: 'Também. iOS e Android.',
    tags: 'da primeira tela à implementação',
  },
  {
    rotulo: 'Sistema',
    pergunta: 'E um sistema de gestão?',
    resposta: 'Também. Desktop ou web.',
    tags: 'sob medida · integrações · relatórios',
  },
  {
    rotulo: 'Dados',
    pergunta: 'E os meus dados?',
    resposta: 'Viram decisão.',
    tags: 'dashboards · análises · modelos de IA',
  },
];
