import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { technologiesData } from '../../utils/data';
import ThreeBackground from '../Hero/ThreeBackground';
import styles from './Technologies.module.scss';

function Technologies() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 30,
      rotateY: -25,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20,
        mass: 0.9,
      },
    },
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
          viewport={{ once: true, amount: 0.1 }}
          style={{ perspective: 800 }}
        >
          {technologiesData.map((tech) => (
            <motion.div key={tech.id} className={styles.item} variants={item}>
              <div className={styles.iconWrapper}>
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}${tech.icon === 'nextdotjs' ? '/white' : ''}`}
                  alt={tech.name}
                  className={styles.icon}
                />
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
