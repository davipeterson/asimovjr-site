/**
 * Logo da Asimov feito de partículas, desenhado num <canvas>.
 *
 * - As partículas formam o círculo e o triângulo do símbolo.
 * - O mouse (ou o dedo) empurra as partículas por perto.
 * - Clique/toque fora de links dá uma "explosão" local.
 * - `setExplode(0..1)` espalha tudo; a hero usa isso conforme a página rola.
 * - Com "reduzir movimento" ativo, o logo é desenhado parado, uma vez.
 * - Só anima quando o canvas está visível e a aba está aberta.
 */

/** Segmentos do triângulo do símbolo, em unidades do logo (o círculo tem raio 45). */
const SEGMENTOS: ReadonlyArray<readonly [number, number, number, number]> = [
  [13.3, -9.7, 28.8, 16.4],
  [28.8, 16.4, -1.8, 16.4],
  [-5.5, 16.4, -28.8, 16.4],
  [-28.8, 16.4, 0, -32.2],
  [0, -32.2, 11.5, -12.9],
];
const RAIO = 45;

interface Particula {
  /** Posição no logo (unidades do logo). */
  lx: number;
  ly: number;
  /** Posição atual na tela (px). */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Direção e força da explosão. */
  dx: number;
  dy: number;
  dd: number;
  /** Fase da oscilação. */
  ph: number;
  /** Partícula branca (o resto é azul). */
  branca: boolean;
}

const COR_AZUL = '#007FFF';
const COR_BRANCA = '#FFFFFF';

function criarParticulas(n: number, w: number, h: number): Particula[] {
  const lens = SEGMENTOS.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1));
  const triLen = lens.reduce((a, b) => a + b, 0);
  const circLen = 2 * Math.PI * RAIO;
  const lista: Particula[] = [];

  for (let i = 0; i < n; i++) {
    let lx: number;
    let ly: number;
    const r = Math.random() * (triLen + circLen);

    if (r < circLen) {
      const a = Math.random() * Math.PI * 2;
      const rr = RAIO + (Math.random() - 0.5) * 4.5;
      lx = Math.cos(a) * rr;
      ly = Math.sin(a) * rr;
    } else {
      let q = r - circLen;
      let k = 0;
      while (k < SEGMENTOS.length - 1 && q > (lens[k] ?? 0)) {
        q -= lens[k] ?? 0;
        k++;
      }
      const [x1, y1, x2, y2] = SEGMENTOS[k] ?? SEGMENTOS[0]!;
      const len = lens[k] ?? 1;
      const t = Math.min(1, q / len);
      const nx = -(y2 - y1) / len;
      const ny = (x2 - x1) / len;
      const j = (Math.random() - 0.5) * 4.5;
      lx = x1 + (x2 - x1) * t + nx * j;
      ly = y1 + (y2 - y1) * t + ny * j;
    }

    const ang = Math.random() * Math.PI * 2;
    lista.push({
      lx,
      ly,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      dx: Math.cos(ang),
      dy: Math.sin(ang),
      dd: 0.35 + Math.random(),
      ph: Math.random() * Math.PI * 2,
      branca: Math.random() < 0.17,
    });
  }
  return lista;
}

export class LogoParticulas {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly parado: boolean;
  private particulas: Particula[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private cx = 0;
  private cy = 0;
  private escala = 1;
  private celular = false;
  private mx = -9999;
  private my = -9999;
  private visivel = true;
  private explode = 0;
  private loop = 0;

  constructor(canvas: HTMLCanvasElement, opcoes: { parado: boolean }) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D indisponível');
    this.canvas = canvas;
    this.ctx = ctx;
    this.parado = opcoes.parado;

    this.layout();
    new ResizeObserver(() => this.layout()).observe(canvas);
    if (this.parado) return;

    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('pointerdown', this.onDown, { passive: true });
    new IntersectionObserver(([entrada]) => {
      this.visivel = entrada?.isIntersecting ?? true;
    }).observe(canvas);
    this.loop = requestAnimationFrame(this.step);
  }

  /** 0 = logo montado, 1 = partículas espalhadas pela tela. */
  setExplode(valor: number): void {
    this.explode = valor;
  }

  private layout(): void {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.celular = w < 760;

    const n = this.celular ? 420 : 950;
    if (this.particulas.length !== n) this.particulas = criarParticulas(n, w, h);

    this.w = w;
    this.h = h;
    if (this.celular) {
      this.cx = w * 0.5;
      this.cy = h * 0.36;
      this.escala = Math.min(w * 0.4, h * 0.22) / 50;
    } else {
      this.cx = w * 0.72;
      this.cy = h * 0.4;
      this.escala = Math.min(w * 0.25, h * 0.33) / 50;
    }

    if (this.parado) {
      for (const p of this.particulas) {
        p.x = this.cx + p.lx * this.escala;
        p.y = this.cy + p.ly * this.escala;
      }
      this.desenhar();
    }
  }

  private desenhar(): void {
    const { ctx, dpr } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const s = (this.celular ? 2 : 2.4) * dpr;
    ctx.fillStyle = COR_AZUL;
    for (const p of this.particulas) if (!p.branca) ctx.fillRect(p.x * dpr, p.y * dpr, s, s);
    ctx.fillStyle = COR_BRANCA;
    for (const p of this.particulas) if (p.branca) ctx.fillRect(p.x * dpr, p.y * dpr, s, s);
  }

  private readonly step = (t: number): void => {
    this.loop = requestAnimationFrame(this.step);
    if (!this.visivel || document.hidden) return;

    const ex = this.explode * Math.max(this.w, this.h) * 0.75;
    const R = this.celular ? 70 : 115;
    const R2 = R * R;

    for (const p of this.particulas) {
      const tx =
        this.cx + p.lx * this.escala + Math.sin(t * 0.0016 + p.ph) * 1.3 + p.dx * p.dd * ex;
      const ty =
        this.cy + p.ly * this.escala + Math.cos(t * 0.0013 + p.ph) * 1.3 + p.dy * p.dd * ex;
      const ddx = p.x - this.mx;
      const ddy = p.y - this.my;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < R2 && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = (1 - d / R) * 4.5;
        p.vx += (ddx / d) * f;
        p.vy += (ddy / d) * f;
      }
      p.vx = (p.vx + (tx - p.x) * 0.045) * 0.84;
      p.vy = (p.vy + (ty - p.y) * 0.045) * 0.84;
      p.x += p.vx;
      p.y += p.vy;
    }
    this.desenhar();
  };

  private readonly onMove = (e: PointerEvent): void => {
    const r = this.canvas.getBoundingClientRect();
    this.mx = e.clientX - r.left;
    this.my = e.clientY - r.top;
  };

  private readonly onDown = (e: PointerEvent): void => {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (x < 0 || y < 0 || x > r.width || y > r.height) return;
    if (e.target instanceof Element && e.target.closest('a, button, input, textarea')) return;
    for (const p of this.particulas) {
      const dx = p.x - x;
      const dy = p.y - y;
      const d = Math.hypot(dx, dy) || 1;
      const f = Math.max(0, 1 - d / 420) * 38;
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
  };

  destruir(): void {
    cancelAnimationFrame(this.loop);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerdown', this.onDown);
  }
}
