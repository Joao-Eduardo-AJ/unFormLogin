import { Form } from '@unform/web';
import { FormLayout } from '../../components/FormLayout';
import { Button, Grid } from '@mui/material';
import { VTextField } from '../../components/VTextField';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../forms/IVFormErros';
/* import { useNavigate } from 'react-router-dom'; */
import { useAppDataContext } from '../../context/AppDataContext';
import { AlertSnackbar } from '../../components/AlertSnackbar';

const formValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface ISubmitData extends yup.InferType<typeof formValidationSchema> {}

export function Login() {
  const formRef = useRef<FormHandles>(null);
  /*   const navigate = useNavigate(); */
  const { alertSnackbarvisible, handleAlertSnackbarVisible } =
    useAppDataContext();

  const handleSubmitForm = (data: ISubmitData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        if (validatedData instanceof Error) {
          alert(Error);
        } else {
          handleAlertSnackbarVisible();
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <>
      <FormLayout>
        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <Grid container gap={2}>
            <VTextField label="email" name="email" />
            <VTextField label="password" name="password" />
            <Button variant="contained" fullWidth type="submit">
              Login
            </Button>
          </Grid>
        </Form>
      </FormLayout>
      <AlertSnackbar
        open={alertSnackbarvisible}
        handleClose={() => handleAlertSnackbarVisible()}
        message="Login details don't match :("
        severity="error"
      />
    </>
  );
}
