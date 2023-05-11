import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@emotion/react';
import { getOrCreateTheme } from './styles/theme';
import './styles/global.css';
import { AppDataProvider } from './context/AppDataContext';

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
