import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  paper: {
    backgroundColor: '#F8F3FB',
    height: '100vh',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    backgroundColor: '#FEFAF7',
    borderRadius: '.6rem',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: '1.5px solid #F2796B',
      },
    },
  },
  link: {
    color: 'rgba(0, 0, 0, 0.6)',
    textDecoration: 'none',
  },
}));
