/**
 * Utilitários das animações ligadas ao scroll.
 *
 * Cada seção registra uma função com `onScrollFrame`. Todas rodam juntas, no máximo uma vez
 * por quadro (requestAnimationFrame), quando a página rola ou muda de tamanho. As seções só
 * escrevem variáveis CSS (`--hero`, `--p0`…); quem anima é o CSS.
 */

type Frame = () => void;

const frames: Frame[] = [];
let pending = 0;

function run(): void {
  pending = 0;
  for (const frame of frames) frame();
}

function schedule(): void {
  if (!pending) pending = requestAnimationFrame(run);
}

let listening = false;

export function onScrollFrame(frame: Frame): void {
  frames.push(frame);
  if (!listening) {
    listening = true;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Fontes e imagens mudam a altura das seções depois do primeiro desenho.
    window.addEventListener('load', schedule);
  }
  frame();
}

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

/** Curva suave (smoothstep) para entradas e saídas. */
export const smooth = (t: number): number => t * t * (3 - 2 * t);

/**
 * Progresso de 0 a 1 de uma seção "alta" com conteúdo grudado (sticky):
 * 0 quando o topo dela encosta no topo da tela, 1 quando o fim dela encosta no fim da tela.
 */
export function stickyProgress(el: HTMLElement): number {
  const vh = window.innerHeight || 800;
  const r = el.getBoundingClientRect();
  const total = r.height - vh;
  return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
}

export function setVar(el: HTMLElement, name: string, value: number, digits = 4): void {
  el.style.setProperty(name, value.toFixed(digits));
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
