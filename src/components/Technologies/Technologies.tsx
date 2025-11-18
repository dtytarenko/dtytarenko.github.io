import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { technologiesData } from '../../utils/data';
import ThreeBackground from '../Hero/ThreeBackground';
import styles from './Technologies.module.scss';

// Icon mapping - використовуємо емодзі як fallback
const iconMap: Record<string, string> = {
  html: '🌐',
  css: '🎨',
  js: '⚡',
  react: '⚛️',
  typescript: '📘',
  threejs: '🎮',
  sass: '💅',
  less: '🔷',
  stylus: '✒️',
  gulp: '🥤',
  webpack: '📦',
  vite: '⚡',
  drupal: '💧',
  wp: '📝',
  git: '🔀',
  npm: '📮',
  jquery: '💲',
  bootstrap: '🅱️',
  figma: '🎨',
  ps: '🖼️',
};

function Technologies() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className={styles.technologies} id="technologies">
      <div className={styles.canvas}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ThreeBackground />
        </Canvas>
      </div>

      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technologies & Tools
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {technologiesData.map((tech) => (
            <motion.div key={tech.id} className={styles.item} variants={item}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>{iconMap[tech.icon] || '⚙️'}</div>
              </div>
              <p className={styles.name}>{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Technologies;
