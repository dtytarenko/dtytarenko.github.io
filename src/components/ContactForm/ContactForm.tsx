import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ContactFormData } from '../../types';
import MatrixBackground from '../Hero/MatrixBackground';
import styles from './ContactForm.module.scss';

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Симулюємо відправку форми
      // В реальному проекті тут буде API запит
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form data:', data);

      setIsSuccess(true);
      reset();

      // Ховаємо success message через 5 секунд
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <MatrixBackground />
      <div className={`container ${styles.inner}`}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind? Let's work together!
        </motion.p>

        <motion.div
          className={styles.contactOptions}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.optionsTitle}>Contact me right now</h3>
          <div className={styles.links}>
            <a
              href="https://linkedin.com/in/dtytarenko"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
              aria-label="Contact via LinkedIn"
            >
              <svg
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://t.me/dtytarenko"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
              aria-label="Contact via Telegram"
            >
              <img
                src="https://cdn.simpleicons.org/telegram/white"
                alt="Telegram"
                className={styles.contactIcon}
              />
              <span>Telegram</span>
            </a>
            <a
              href="mailto:dtytarenko@protonmail.com"
              className={styles.contactLink}
              aria-label="Contact via Email"
            >
              <img
                src="https://cdn.simpleicons.org/protonmail/white"
                alt="Email"
                className={styles.contactIcon}
              />
              <span>dtytarenko@protonmail.com</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {isSuccess && (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Thank you for your message! I'll get back to you soon.
            </motion.div>
          )}

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Your name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your.email@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Tell me about your project..."
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                })}
              />
              {errors.message && (
                <span className={styles.error}>{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
              aria-label="Send message"
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm;
