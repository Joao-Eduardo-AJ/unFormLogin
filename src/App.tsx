import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@emotion/react';
import { getOrCreateTheme } from './styles/theme';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={getOrCreateTheme()}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
