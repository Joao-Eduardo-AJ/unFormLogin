import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from '../../styles/styles';
import { Person2Outlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface FormLayoutProps {
  children: ReactNode;
}

export function FormLayout({ children }: FormLayoutProps) {
  const { classes } = useStyles();
  const location = window.location.pathname;

  return (
    <Card className={classes.paper}>
      <Grid container>
        <Grid item alignSelf={['start']}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            display="flex"
            alignItems="center"
          >
            {location === '/' ? 'Login' : 'Sign up'}
            <Person2Outlined fontSize="small" />
          </Typography>
          <Typography variant="body2" color="#00000099" fontSize={12}>
            {location === '/' ? 'Welcome back!' : 'Welcome!'}
          </Typography>
        </Grid>
        <Grid container item alignItems="center" direction="column" gap={2}>
          <img src="/public/images/login.svg" height={190} />
          <Typography variant="body2" fontWeight={800} color="primary">
            {location === '/'
              ? 'Enter your login details ;)'
              : 'Enter your registration details ;)'}
          </Typography>
        </Grid>
      </Grid>
      <CardContent sx={{ padding: '0' }}>{children}</CardContent>
      <Grid container item direction="column" alignItems="center" gap={2}>
        <Typography
          variant="body2"
          color="#00000099"
          fontSize={12}
          display="flex"
          gap={1}
        >
          <img src="/public/images/pipe.svg" />
          Or {location === '/' ? 'login' : 'sign up'} with
          <img src="/public/images/pipe.svg" />
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          gap={0.5}
          fontWeight={600}
        >
          <img src="/public/images/google.svg" alt="google" />
          Google
        </Typography>
      </Grid>
      <Typography color="#00000099" fontSize={12}>
        {location === '/'
          ? "You don't have an account? "
          : 'You already have an account? '}
        <Link to={location === '/' ? 'register' : '/'} className={classes.link}>
          <strong>{location === '/' ? 'Sign up' : 'Login'}</strong>
        </Link>
      </Typography>
    </Card>
  );
}