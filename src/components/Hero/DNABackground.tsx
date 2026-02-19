import { useEffect, useRef } from 'react';
import styles from './DNABackground.module.scss';

const CODE_LABELS = [
  '<div>', '</div>', 'const', '=>', '{}', 'async', 'await',
  'React', 'tsx', 'npm', 'git', 'API', 'CSS', 'HTML', 'JS',
  'fetch', 'then', 'type', 'props', 'hook', 'state', 'ref',
  'useEffect', 'useState', 'map()', 'filter()', '.ts',
];

interface Particle {
  t: number;   // position along helix (0..1)
  strand: 0 | 1;
  label: string;
  opacity: number;
  size: number;
}

function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let animFrame: number;
    let time = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Build particles spread along helix
    const TOTAL = 60;
    const particles: Particle[] = Array.from({ length: TOTAL }, (_, i) => ({
      t: i / TOTAL,
      strand: (i % 2) as 0 | 1,
      label: CODE_LABELS[Math.floor(Math.random() * CODE_LABELS.length)],
      opacity: 0.4 + Math.random() * 0.5,
      size: 10 + Math.random() * 5,
    }));

    // Cross-bridge pairs every N nodes
    const BRIDGES = 18;

    function getPos(t: number, strand: 0 | 1, time: number) {
      const loops = 3.5;
      const angle = t * loops * Math.PI * 2 + time * 0.4 + (strand === 1 ? Math.PI : 0);
      const radiusX = Math.min(W * 0.18, 160);
      const radiusY = Math.min(H * 0.06, 50);
      const cx = W / 2;
      const cy = H / 2;
      // Helix travels vertically
      const ySpread = H * 0.72;
      const x = cx + Math.cos(angle) * radiusX;
      const y = cy - ySpread / 2 + t * ySpread + Math.sin(angle * 0.5) * radiusY * 0.3;
      const z = Math.sin(angle); // depth
      return { x, y, z };
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      time += 0.012;

      // Draw bridges first (behind nodes)
      for (let b = 0; b < BRIDGES; b++) {
        const t = b / BRIDGES;
        const p0 = getPos(t, 0, time);
        const p1 = getPos(t, 1, time);

        const depth = (p0.z + 1) / 2;
        const alpha = 0.08 + depth * 0.18;

        const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grad.addColorStop(0, `rgba(80,180,255,${alpha})`);
        grad.addColorStop(0.5, `rgba(180,100,255,${alpha * 1.4})`);
        grad.addColorStop(1, `rgba(80,180,255,${alpha})`);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + depth;
        ctx.stroke();
      }

      // Draw helix backbone lines
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const t = i / 120;
          const { x, y, z } = getPos(t, strand as 0 | 1, time);
          const depth = (z + 1) / 2;
          const alpha = 0.15 + depth * 0.3;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          // Stroke segment by segment for gradient depth effect
          if (i > 0) {
            ctx.strokeStyle = strand === 0
              ? `rgba(80,180,255,${alpha})`
              : `rgba(160,80,255,${alpha})`;
            ctx.lineWidth = 1.5 + depth * 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
          }
        }
      }

      // Draw node particles
      particles.forEach((p) => {
        // Slowly scroll particles downward, loop
        p.t = (p.t + 0.0003) % 1;

        const { x, y, z } = getPos(p.t, p.strand, time);
        const depth = (z + 1) / 2;
        const alpha = p.opacity * (0.4 + depth * 0.6);
        const r = (p.size * 0.35) * (0.6 + depth * 0.7);

        // Glow circle
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
        const color = p.strand === 0 ? '80,180,255' : '160,80,255';
        grd.addColorStop(0, `rgba(${color},${alpha * 0.9})`);
        grd.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();

        // Label text
        ctx.font = `${Math.round(p.size * (0.55 + depth * 0.3))}px "Fira Code", monospace`;
        ctx.fillStyle = `rgba(${color},${alpha * 0.85})`;
        ctx.textAlign = 'center';
        ctx.fillText(p.label, x, y - r - 5);
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.dna} />;
}

export default DNABackground;
