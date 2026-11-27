import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Posts do blog: um arquivo Markdown por post em src/content/blog/.
 * O nome do arquivo vira o endereço (ex.: o-proposito-da-asimov.md → /blog/o-proposito-da-asimov).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    subtitulo: z.string(),
    /** Resumo curto: aparece na lista do blog e no Google. */
    resumo: z.string().max(200),
    data: z.coerce.date(),
    autor: z.string().default('Asimov Jr'),
    /** Frase curta e grande na capa azul do post, na lista do blog. */
    capa: z.string().max(40),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { blog };
