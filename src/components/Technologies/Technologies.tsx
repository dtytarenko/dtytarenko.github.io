import { motion } from 'framer-motion';
import { technologiesData } from '../../utils/data';
import TerminalBackground from '../Hero/TerminalBackground';
import styles from './Technologies.module.scss';

function Technologies() {
  return (
    <section className={styles.technologies} id="technologies">
      <TerminalBackground />

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

        <div className={styles.grid}>
          {technologiesData.map((tech, index) => (
            <div
              key={tech.id}
              className={styles.item}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}${tech.icon === 'nextdotjs' ? '/white' : ''}`}
                  alt={tech.name}
                  className={styles.icon}
                />
              </div>
              <p className={styles.name}>{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;
