import { Alert, AlertProps, Slide, SlideProps, Snackbar } from '@mui/material';

type AlertSnackbarProps = AlertProps & {
  message: string;
  open: boolean;
  handleClose: () => void;
};

export const AlertSnackbar = ({
  message,
  handleClose,
  ...props
}: AlertSnackbarProps) => {
  return (
    <Snackbar
      {...props}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      onAnimationEnd={() => !open}
      autoHideDuration={1200}
    >
      <Alert {...props} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
