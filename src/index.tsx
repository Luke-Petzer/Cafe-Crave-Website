import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <HelmetProvider>
    <AppRouter />
  </HelmetProvider>
);
