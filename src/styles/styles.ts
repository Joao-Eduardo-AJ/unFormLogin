import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  tableCell: {
    borderBottom: '1px solid #D2775D',
  },
  paper: {
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
    '& .MuiFormHelperText-root': {
      background: 'linear-gradient(to top, #F8F3FB, #FEFAF7)',
      margin: 0,
      padding: '0 1rem',
      borderRadius: '0px 0px 8px 8px',
    },
  },
  link: {
    color: 'rgba(0, 0, 0, 0.6)',
    textDecoration: 'none',
  },
}));
