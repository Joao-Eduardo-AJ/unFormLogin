import { Theme, createTheme } from '@mui/material';

let themeRef: Theme | undefined;

export const getOrCreateTheme = () => {
  return (
    themeRef ||
    (themeRef = createTheme({
      palette: {
        primary: {
          main: '#F2796B',
          dark: '#D2775D',
          light: '#F99D61',
          contrastText: '#F8F3FB',
        },
        secondary: {
          main: '#43A047',
          dark: '#00701A',
          light: '#76D275',
          contrastText: '#FFFFFF',
        },
        text: {
          primary: '#000000DE',
          secondary: '#0000008A',
          disabled: '#00000061',
        },
        action: {
          hover: '#E0E0E0',
          selected: '#00000014',
          disabledBackground: '#0000001F',
        },
        info: {
          main: '#2196F3',
          dark: '#0B79D0',
          light: '#64B6F7',
        },
        error: {
          main: '#F44336',
          dark: '#69110b',
          light: '#F88078',
        },
        warning: {
          main: '#FF9800',
          dark: '#C77700',
          light: '#FFB547',
        },
        success: {
          main: '#4CAF50',
          dark: '#3B873E',
          light: '#7BC67E',
        },
        divider: '#E0E0E0',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '.6rem',
              fontWeight: 800,
              textTransform: 'inherit',
            },
          },
        },
      },
    }))
  );
};
