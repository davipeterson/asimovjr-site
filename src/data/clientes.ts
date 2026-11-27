/**
 * Empresas do carrossel "Quem já confiou na gente".
 *
 * Para adicionar um cliente:
 * 1. Coloque a logo em src/assets/clientes/ (SVG ou PNG com fundo transparente, de boa qualidade).
 * 2. Importe a logo aqui e adicione um item na lista.
 * 3. `altura` é a altura máxima da logo em px no computador: ajuste até ela ficar com o mesmo
 *    "peso visual" das outras (logos quadradas pedem mais altura que as compridas).
 * 4. Use `mostrarNome: true` só quando a logo não traz o nome escrito.
 */
import type { ImageMetadata } from 'astro';

import ambev from '@/assets/clientes/ambev.svg';
import aperam from '@/assets/clientes/aperam.png';
import fejemg from '@/assets/clientes/fejemg.png';
import santacasa from '@/assets/clientes/santacasa.png';
import saocarlos from '@/assets/clientes/saocarlos.png';
import paulacastro from '@/assets/clientes/paulacastro.png';
import arborizai from '@/assets/clientes/arborizai.png';
import sanfran from '@/assets/clientes/sanfran.png';
import engepro from '@/assets/clientes/engepro.png';
import unifeijr from '@/assets/clientes/unifeijr.png';
import alwema from '@/assets/clientes/alwema.png';
import measure from '@/assets/clientes/measure.png';
import unifei from '@/assets/clientes/unifei.png';
import uairrior from '@/assets/clientes/uairrior.png';

export interface Cliente {
  nome: string;
  logo: ImageMetadata;
  altura: number;
  mostrarNome?: boolean;
}

export const clientes: readonly Cliente[] = [
  { nome: 'Ambev', logo: ambev, altura: 46 },
  { nome: 'Aperam Bioenergia', logo: aperam, altura: 48 },
  { nome: 'FEJEMG', logo: fejemg, altura: 60 },
  { nome: 'Santa Casa de Itajubá', logo: santacasa, altura: 78 },
  { nome: 'Prefeitura de São Carlos', logo: saocarlos, altura: 78, mostrarNome: true },
  { nome: 'Paula Castro Laboratório', logo: paulacastro, altura: 62 },
  { nome: 'ArborizAI', logo: arborizai, altura: 50 },
  { nome: 'SanFran Jr.', logo: sanfran, altura: 78 },
  { nome: 'EngePro', logo: engepro, altura: 56 },
  { nome: 'UNIFEI Júnior', logo: unifeijr, altura: 60, mostrarNome: true },
  { nome: 'Alwema', logo: alwema, altura: 62 },
  { nome: 'Measure Offshore', logo: measure, altura: 48 },
  { nome: 'UNIFEI', logo: unifei, altura: 50 },
  { nome: 'Uai!rrior', logo: uairrior, altura: 52 },
];
