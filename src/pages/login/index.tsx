import { Form } from '@unform/web';
import { FormLayout } from '../../components/FormLayout';
import { Button, Grid } from '@mui/material';
import { VTextField } from '../../components/VTextField';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../forms/IVFormErros';
import { useNavigate } from 'react-router-dom';
import { useAppDataContext } from '../../context/AppDataContext';
import { AlertSnackbar } from '../../components/AlertSnackbar';
interface ISubmitData {
  email: string;
  password: string;
}

const formValidationSchema: yup.ObjectSchema<ISubmitData> = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export function Login() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { alertSnackbarvisible, handleAlertSnackbarVisible, registeredUsers } =
    useAppDataContext();

  const handleSubmitForm = (data: ISubmitData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        if (validatedData instanceof Error) {
          alert(Error);
        } else {
          const userData = registeredUsers.find(
            data =>
              data.email === validatedData.email &&
              data.password === validatedData.password
          );
          userData ? navigate('registeredusers') : handleAlertSnackbarVisible();
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
            <VTextField label="Email" name="email" />
            <VTextField label="Password" name="password" />
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
