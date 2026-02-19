import { useEffect, useRef } from 'react';
import styles from './TerminalBackground.module.scss';

const COMMANDS = [
  { input: 'git clone https://github.com/dtytarenko/portfolio.git', delay: 0 },
  { input: 'cd portfolio', delay: 800 },
  { input: 'npm install', delay: 400, output: ['added 1284 packages in 4.2s', ''] },
  { input: 'npm run dev', delay: 600, output: ['> vite', '', '  VITE v6.4.1  ready in 968ms', '', '  ➜  Local:   http://localhost:5173/', ''] },
  { input: 'git checkout -b feature/hero-animation', delay: 1000, output: ["Switched to a new branch 'feature/hero-animation'", ''] },
  { input: 'code src/components/Hero/Hero.tsx', delay: 600 },
  { input: 'const animate = () => requestAnimationFrame(animate)', delay: 800 },
  { input: 'git add . && git commit -m "feat: add hero animation"', delay: 500, output: ['[feature/hero-animation 3f2a1c8] feat: add hero animation', ' 3 files changed, 142 insertions(+)', ''] },
  { input: 'git push origin feature/hero-animation', delay: 700, output: ['Branch pushed. Opening PR...', ''] },
  { input: 'npm run build', delay: 900, output: ['vite v6.4.1 building for production...', '✓ 38 modules transformed.', 'dist/index.html  0.46 kB', 'dist/assets/index-Bx2k9.js  312.84 kB', '✓ built in 1.42s', ''] },
];

interface Line {
  text: string;
  type: 'input' | 'output' | 'cursor';
  done: boolean;
}

function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const lines: Line[] = [];
    let animFrame: number;
    let charTimer: ReturnType<typeof setTimeout>;
    let cmdIndex = 0;
    let charIndex = 0;
    let outputIndex = 0;
    let phase: 'typing' | 'output' | 'pause' = 'typing';

    const FONT_SIZE = 13;
    const LINE_HEIGHT = 20;
    const PADDING_X = 40;
    const PADDING_Y = 40;
    const PROMPT = '❯ ';

    const maxLines = () => Math.floor((canvas.height - PADDING_Y * 2) / LINE_HEIGHT);

    function addLine(text: string, type: Line['type']) {
      lines.push({ text, type, done: type !== 'input' });
      if (lines.length > maxLines() + 5) lines.shift();
    }

    function nextCommand() {
      if (cmdIndex >= COMMANDS.length) {
        cmdIndex = 0;
        lines.length = 0;
      }
      charIndex = 0;
      outputIndex = 0;
      phase = 'typing';
      addLine('', 'input');
    }

    nextCommand();

    function tick() {
      const cmd = COMMANDS[cmdIndex];

      if (phase === 'typing') {
        const currentLine = lines[lines.length - 1];
        if (charIndex < cmd.input.length) {
          currentLine.text = cmd.input.slice(0, charIndex + 1);
          charIndex++;
          charTimer = setTimeout(tick, 38 + Math.random() * 40);
        } else {
          currentLine.done = true;
          phase = 'output';
          charTimer = setTimeout(tick, cmd.delay ?? 400);
        }
      } else if (phase === 'output') {
        const output = cmd.output;
        if (output && outputIndex < output.length) {
          addLine(output[outputIndex], 'output');
          outputIndex++;
          charTimer = setTimeout(tick, 60);
        } else {
          phase = 'pause';
          charTimer = setTimeout(() => {
            cmdIndex++;
            nextCommand();
            tick();
          }, 700);
        }
      }
    }

    charTimer = setTimeout(tick, 500);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "Fira Code", "Cascadia Code", monospace`;

      let y = PADDING_Y;

      lines.forEach((line, i) => {
        const isLast = i === lines.length - 1;

        if (line.type === 'input') {
          // prompt symbol
          ctx.fillStyle = 'rgba(100, 220, 100, 0.55)';
          ctx.fillText(PROMPT, PADDING_X, y);
          const promptW = ctx.measureText(PROMPT).width;

          // command text
          ctx.fillStyle = 'rgba(220, 220, 220, 0.7)';
          ctx.fillText(line.text, PADDING_X + promptW, y);

          // blinking cursor on last unfinished line
          if (isLast && !line.done) {
            const textW = ctx.measureText(line.text).width;
            const blink = Math.floor(Date.now() / 500) % 2 === 0;
            if (blink) {
              ctx.fillStyle = 'rgba(100, 220, 100, 0.8)';
              ctx.fillRect(PADDING_X + promptW + textW + 2, y - FONT_SIZE + 2, 8, FONT_SIZE);
            }
          }
        } else if (line.type === 'output') {
          const isGreen = line.text.startsWith('✓') || line.text.startsWith('Branch') || line.text.startsWith('Switched') || line.text.startsWith('[feature');
          const isBlue = line.text.includes('http') || line.text.includes('vite') || line.text.includes('VITE');
          const isDim = line.text === '';

          if (isGreen) ctx.fillStyle = 'rgba(80, 200, 120, 0.55)';
          else if (isBlue) ctx.fillStyle = 'rgba(100, 160, 255, 0.55)';
          else if (isDim) ctx.fillStyle = 'transparent';
          else ctx.fillStyle = 'rgba(160, 160, 160, 0.45)';

          ctx.fillText('  ' + line.text, PADDING_X, y);
        }

        y += LINE_HEIGHT;
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(charTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.terminal} />;
}

export default TerminalBackground;
