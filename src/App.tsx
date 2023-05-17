import { ThemeProvider } from '@emotion/react';
import { getOrCreateTheme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { AppRoutes } from './routes';
import './styles/global.css';
import './forms/translationYup';

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
