import { useEffect, useRef } from 'react';
import styles from './WorldMapBackground.module.scss';

interface City {
  name: string;
  x: number; // percentage
  y: number; // percentage
}

const cities: City[] = [
  { name: 'Kyiv', x: 55, y: 35 }, // Center - Kyiv
  { name: 'London', x: 48, y: 38 },
  { name: 'New York', x: 25, y: 42 },
  { name: 'San Francisco', x: 15, y: 45 },
  { name: 'Tokyo', x: 85, y: 45 },
  { name: 'Singapore', x: 78, y: 65 },
  { name: 'Sydney', x: 88, y: 75 },
  { name: 'Dubai', x: 65, y: 50 },
];

function WorldMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Load and draw SVG world map
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1000" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="1">
        <!-- Simplified world map paths -->
        <!-- North America -->
        <path d="M 200 300 L 180 400 L 220 500 L 280 520 L 320 480 L 340 420 L 320 360 L 280 320 L 240 280 Z"/>
        <!-- South America -->
        <path d="M 280 540 L 300 600 L 320 680 L 300 740 L 260 720 L 240 640 L 250 560 Z"/>
        <!-- Europe -->
        <path d="M 480 280 L 520 320 L 560 300 L 600 360 L 620 400 L 600 440 L 560 460 L 520 440 L 480 400 Z"/>
        <!-- Africa -->
        <path d="M 520 460 L 560 500 L 580 600 L 560 700 L 520 720 L 480 680 L 460 580 L 480 480 Z"/>
        <!-- Asia -->
        <path d="M 640 240 L 740 280 L 860 320 L 900 420 L 860 500 L 780 540 L 700 520 L 640 460 L 600 360 L 620 280 Z"/>
        <!-- Australia -->
        <circle cx="840" cy="700" r="60"/>

        <!-- Grid lines -->
        <line x1="0" y1="250" x2="2000" y2="250" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>
        <line x1="0" y1="500" x2="2000" y2="500" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>
        <line x1="0" y1="750" x2="2000" y2="750" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>

        <line x1="500" y1="0" x2="500" y2="1000" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>
        <line x1="1000" y1="0" x2="1000" y2="1000" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>
        <line x1="1500" y1="0" x2="1500" y2="1000" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"/>
      </svg>
    `);

    // Animation state
    let animationFrame: number;
    const connections: Array<{ progress: number; speed: number; cityIndex: number }> = [];

    // Initialize connections
    cities.forEach((city, index) => {
      if (index === 0) return; // Skip Kyiv itself
      connections.push({
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        cityIndex: index,
      });
    });

    // Quadratic bezier curve for ballistic trajectory
    const drawBallisticLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number
    ) => {
      // Control point (arc height)
      const midX = (x1 + x2) / 2;
      const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.3;

      // Draw path
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.stroke();

      // Draw animated dot
      const t = progress;
      const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
      const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;

      // Glowing dot
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, 12);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw city dots
    const drawCities = () => {
      cities.forEach((city, index) => {
        const x = (city.x / 100) * canvas.width;
        const y = (city.y / 100) * canvas.height;

        // Kyiv (center) - larger and brighter
        if (index === 0) {
          // Outer glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fill();

          // Main dot
          ctx.fillStyle = 'rgba(59, 130, 246, 1)';
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Center
          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Other cities
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = 'rgba(59, 130, 246, 1)';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw world map background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw connections
      const kyiv = cities[0];
      const kyivX = (kyiv.x / 100) * canvas.width;
      const kyivY = (kyiv.y / 100) * canvas.height;

      connections.forEach((conn) => {
        const city = cities[conn.cityIndex];
        const cityX = (city.x / 100) * canvas.width;
        const cityY = (city.y / 100) * canvas.height;

        drawBallisticLine(kyivX, kyivY, cityX, cityY, conn.progress);

        // Update progress
        conn.progress += conn.speed;
        if (conn.progress > 1) {
          conn.progress = 0;
        }
      });

      // Draw cities on top
      drawCities();

      animationFrame = requestAnimationFrame(animate);
    };

    img.onload = () => {
      animate();
    };

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.worldMap} />;
}

export default WorldMapBackground;
