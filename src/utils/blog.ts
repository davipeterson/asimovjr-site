import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Posts publicados (sem rascunhos), do mais novo para o mais antigo. */
export async function postsPublicados(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.rascunho);
  return posts.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** Tempo de leitura em minutos, a ~200 palavras por minuto. */
export function tempoDeLeitura(texto: string): number {
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "21 jan 2026" */
export function dataCurta(data: Date): string {
  return formatoData.format(data).replace(/\./g, '').replace(/ de /g, ' ');
}
