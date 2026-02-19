import { useState } from 'react';
import { motion } from 'framer-motion';
import TerminalBackground from './TerminalBackground';
import DNABackground from './DNABackground';
import styles from './Hero.module.scss';

type BgVariant = 'terminal' | 'dna';

function Hero() {
  const [bg, setBg] = useState<BgVariant>('terminal');
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Анімація для кожної літери в імені
  const firstName = "Dmytro";
  const lastName = "Tytarenko";
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    })
  };

  // Анімація для слів у субтитлі
  const subtitleWords = "Web Developer".split(" ");
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      filter: "blur(8px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 1.2 + i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Анімація з ефектом reveal для опису
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      clipPath: "inset(0 100% 0 0)"
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        delay: 1.8,
        duration: 1.2,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    }
  };

  return (
    <section className={styles.hero} id="hero">
      {bg === 'terminal' ? <TerminalBackground /> : <DNABackground />}

      <div className={styles.bgSwitcher}>
        <button
          className={`${styles.bgBtn} ${bg === 'terminal' ? styles.bgBtnActive : ''}`}
          onClick={() => setBg('terminal')}
          aria-label="Terminal background"
        >
          Terminal
        </button>
        <button
          className={`${styles.bgBtn} ${bg === 'dna' ? styles.bgBtnActive : ''}`}
          onClick={() => setBg('dna')}
          aria-label="DNA background"
        >
          DNA
        </button>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          <span className={styles.firstName}>
            {firstName.split("").map((char, index) => (
              <motion.span
                key={`first-${char}-${index}`}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {' '}
          <span className={styles.lastName}>
            {lastName.split("").map((char, index) => (
              <motion.span
                key={`last-${char}-${index}`}
                custom={firstName.length + index + 1}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <p className={styles.subtitle}>
          {subtitleWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              custom={index}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'inline-block', marginRight: '0.5ch' }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.p
          className={styles.description}
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          {`Specializing in building high-performance e-commerce solutions with modern web technologies and advanced web animations.
Creating exceptional digital experiences with focus on user experience, performance, and conversion optimization.`}
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 2.5,
            duration: 0.8,
            ease: [0.6, 0.01, 0.05, 0.95]
          }}
        >
          <motion.button
            className={styles.buttonPrimary}
            onClick={scrollToContact}
            aria-label="Contact me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0)",
                "0 0 0 10px rgba(255, 255, 255, 0.1)",
                "0 0 0 20px rgba(255, 255, 255, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <span className={styles.buttonText}>Contact Me</span>
            <svg className={styles.buttonIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 8L10.89 13.26C11.23 13.47 11.66 13.47 12 13.26L20 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            className={styles.buttonSecondary}
            onClick={scrollToPortfolio}
            aria-label="View my work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              borderColor: [
                "rgba(255, 255, 255, 0.5)",
                "rgba(255, 255, 255, 0.8)",
                "rgba(255, 255, 255, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className={styles.buttonText}>View My Work</span>
            <motion.svg
              className={styles.buttonIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        onClick={scrollToPortfolio}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className={styles.arrow} />
      </motion.div>
    </section>
  );
}

export default Hero;
