import './index.css';
import { render } from 'react-dom';
import { AppRouter } from './AppRouter';
import { HelmetProvider } from 'react-helmet-async';

render(
  <HelmetProvider>
    <AppRouter />
  </HelmetProvider>,
  document.getElementById('root')
);
