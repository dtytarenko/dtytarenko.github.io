import { lazy, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { portfolioData } from '../../utils/data';
import styles from './Portfolio.module.scss';

// Lazy load Three.js компоненти
const Canvas = lazy(() => import('@react-three/fiber').then(module => ({ default: module.Canvas })));
const ThreeBackground = lazy(() => import('../Hero/ThreeBackground'));

// @ts-ignore - CSS imports don't have types
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/effect-coverflow';

function Portfolio() {
  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.canvas}>
        <Suspense fallback={<div style={{ background: '#000' }} />}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <ThreeBackground />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>

      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Works
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            centeredSlides={false}
            initialSlide={0}
            watchSlidesProgress={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className={styles.swiperContainer}
          >
            {portfolioData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.slide}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.slideTitle}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.technologies}>
                      {item.technologies.map((tech, index) => (
                        <span key={index} className={styles.tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      aria-label={`Visit ${item.title} website`}
                    >
                      Visit Website →
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default Portfolio;
