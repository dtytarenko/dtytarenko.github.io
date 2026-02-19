import { useEffect, useRef, useState } from 'react';
import styles from './MatrixBackground.module.scss';

function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Встановлюємо розмір canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Важливо: Заповнюємо весь canvas чорним ОДРАЗУ
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Тепер можна показувати canvas
    setIsReady(true);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);

    const cols = Math.floor(canvas.width / 20) + 1;
    // Рандомізуємо початкові позиції, щоб символи були по всьому екрану відразу
    const ypos = Array(cols).fill(0).map(() => Math.random() * canvas.height);

    function matrix() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 20;
        }
      });
    }

    const interval = setInterval(matrix, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.matrix} ${isReady ? styles.ready : ''}`}
    />
  );
}

export default MatrixBackground;
