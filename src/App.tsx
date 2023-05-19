import { ThemeProvider } from '@emotion/react';
import { getOrCreateTheme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppDataProvider } from './shared/contexts/AppDataContext';
import { AppRoutes } from './routes';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={getOrCreateTheme()}>
      <BrowserRouter>
        <AppDataProvider>
          <AppRoutes />
        </AppDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
