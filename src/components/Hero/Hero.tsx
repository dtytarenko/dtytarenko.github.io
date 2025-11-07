import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';
import styles from './Hero.module.scss';

function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.canvas}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ThreeBackground />
        </Canvas>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Dmytro Tytarenko
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Web Developer
        </motion.p>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Specializing in building high-performance e-commerce solutions with Drupal, WordPress/WooCommerce, Shopware
          and modern web technologies including React+Redux, Three.js, and advanced web animations. Creating exceptional
          digital experiences with focus on user experience, performance, and conversion optimization.
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            className={styles.buttonPrimary}
            onClick={scrollToPortfolio}
            aria-label="View my work"
          >
            View My Work
          </button>
          <button
            className={styles.buttonSecondary}
            onClick={scrollToContact}
            aria-label="Contact me"
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>

      <div className={styles.scrollIndicator} onClick={scrollToPortfolio}>
        <div className={styles.arrow} />
      </div>
    </section>
  );
}

export default Hero;
