import { Theme, createTheme } from '@mui/material';

let themeRef: Theme | undefined;

export const getOrCreateTheme = () => {
  return (
    themeRef ||
    (themeRef = createTheme({
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
    }))
  );
};
