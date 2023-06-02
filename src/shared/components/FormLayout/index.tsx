import { CardContent, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useStyles } from '../../../styles/styles';
import { Person2Outlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../../../shared/forms/TranslationYup';
import { FloatingBalls } from '../FloatingBall';
import { useAppDataContext } from '../../contexts/AppDataContext';
interface FormLayoutProps {
  children: ReactNode;
}

export function FormLayout({ children }: FormLayoutProps) {
  const { classes } = useStyles();
  const location = window.location.pathname;
  const floatingBallTypes = ['One', 'Two', 'Three'];
  const { ballSize } = useAppDataContext();

  return (
    <Grid
      container
      position="relative"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      height="100vh"
    >
      {floatingBallTypes.map(ballType => (
        <FloatingBalls type={ballType} key={ballType} ballSize={ballSize} />
      ))}
      <Grid container className={classes.paper} maxWidth={450} maxHeight={920}>
        <Grid container gap={2} zIndex={1}>
          <Grid container item>
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
            <Grid
              container
              item
              alignItems="center"
              direction="column"
              gap={2}
              marginTop={1}
            >
              <img src="/public/images/login.svg" height={260} />
              <Typography variant="body2" fontWeight={800} color="primary">
                {location === '/'
                  ? 'Enter your login details ;)'
                  : 'Enter your registration details ;)'}
              </Typography>
            </Grid>
          </Grid>
          <CardContent sx={{ padding: '0' }}>{children}</CardContent>
          <Grid container item direction="column" alignItems="center" gap={3}>
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
        </Grid>
        <Typography color="#00000099" fontSize={12} zIndex={1}>
          {location === '/'
            ? "You don't have an account? "
            : 'You already have an account? '}
          <Link
            to={location === '/' ? 'register' : '/'}
            className={classes.link}
          >
            <strong>{location === '/' ? 'Sign up' : 'Login'}</strong>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
