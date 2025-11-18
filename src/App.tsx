import { lazy, Suspense } from 'react';
import Hero from './components/Hero/Hero';

// Lazy load компоненти для code splitting
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const Technologies = lazy(() => import('./components/Technologies/Technologies'));
const ContactForm = lazy(() => import('./components/ContactForm/ContactForm'));

// Loading компонент
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: 'var(--color-text-secondary)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(59, 130, 246, 0.1)',
        borderTopColor: 'var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Hero />

      <Suspense fallback={<LoadingSpinner />}>
        <Portfolio />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Technologies />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ContactForm />
      </Suspense>

      <footer style={{
        textAlign: 'center',
        padding: 'var(--spacing-md) 0',
        background: 'var(--color-bg-secondary)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-sm)'
      }}>
        <p>© {new Date().getFullYear()} Dmytro Tytarenko. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
