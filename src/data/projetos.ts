/**
 * Os 4 projetos em destaque da seção "Já entregamos".
 *
 * `midia.tipo`:
 *  - 'logo': logo centralizada sobre fundo branco (quando não há print do projeto)
 *  - 'print': print da tela, recortado para preencher o card; `site` vira o selo azul
 *
 * Os cards alternam entre fundo branco e azul, na ordem da lista.
 */
import type { ImageMetadata } from 'astro';

import arborizai from '@/assets/clientes/arborizai.png';
import paulacastro from '@/assets/clientes/paulacastro.png';
import sanfranSite from '@/assets/projetos/sanfran-site.jpg';
import engeproSite from '@/assets/projetos/engepro-site.jpg';

export interface Projeto {
  nome: string;
  tipo: string;
  descricao: string;
  midia:
    | { tipo: 'logo'; imagem: ImageMetadata; alt: string }
    | { tipo: 'print'; imagem: ImageMetadata; alt: string; site: string };
}

export const projetos: readonly Projeto[] = [
  {
    nome: 'ArborizAI',
    tipo: 'aplicativo · campeão mundial',
    descricao:
      'App de coleta em campo com formulários associados à localização, envio de mídias e consulta aos registros. Case campeão de impacto no ENEJ 2026.',
    midia: { tipo: 'logo', imagem: arborizai, alt: 'Logo do ArborizAI' },
  },
  {
    nome: 'Paula Castro',
    tipo: 'sistema',
    descricao:
      'Sistema desenvolvido para o Laboratório Paula Castro, de análises e pesquisas clínicas.',
    midia: { tipo: 'logo', imagem: paulacastro, alt: 'Logo do Laboratório Paula Castro' },
  },
  {
    nome: 'SanFran Jr.',
    tipo: 'site institucional',
    descricao: 'Site institucional que apresenta a empresa e facilita o contato.',
    midia: {
      tipo: 'print',
      imagem: sanfranSite,
      alt: 'Página inicial do site da SanFran Jr.',
      site: 'sanfranjr.com.br',
    },
  },
  {
    nome: 'EngePro',
    tipo: 'site',
    descricao: 'Site para captação de clientes.',
    midia: {
      tipo: 'print',
      imagem: engeproSite,
      alt: 'Página inicial do site da EngePro',
      site: 'engeproconsultoria.com.br',
    },
  },
];
