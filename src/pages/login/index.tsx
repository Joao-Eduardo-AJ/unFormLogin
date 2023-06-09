import { Form } from '@unform/web';
import { FormLayout } from '../../shared/components/FormLayout';
import { Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { VTextField } from '../../shared/forms/VTextField';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../shared/forms/IVFormErros';
import { useNavigate } from 'react-router-dom';
import { useAppDataContext } from '../../shared/contexts/AppDataContext';
import { AlertSnackbar } from '../../shared/components/AlertSnackbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useVForm } from '../../shared/forms/useVForm';
import { TextsProvider } from '../../translation/appTranslation';
interface ISubmitData {
  email: string;
  password: string;
}

const formValidationSchema: yup.ObjectSchema<ISubmitData> = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export function Login() {
  const navigate = useNavigate();
  const { alertSnackbarvisible, handleAlertSnackbarVisible, registeredUsers } =
    useAppDataContext();
  const { formRef, login } = useVForm();
  const texts = TextsProvider.get();

  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    registeredUsers.length > 5 &&
      formRef.current?.setData(registeredUsers[registeredUsers.length - 1]);
  }, [formRef, registeredUsers]);

  return (
    <>
      <FormLayout>
        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <Grid container gap={2}>
            <VTextField label="Email" name="email" />
            <VTextField
              label={texts.PASSWORD_LABEL}
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        showPassword
                          ? setShowPassword(false)
                          : setShowPassword(true);
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" fullWidth onClick={login}>
              {texts.LOGIN}
            </Button>
          </Grid>
        </Form>
      </FormLayout>
      <AlertSnackbar
        open={alertSnackbarvisible}
        handleClose={() => handleAlertSnackbarVisible()}
        message={texts.LOGIN_DETAILS_DONT_MATCH}
        severity="error"
      />
    </>
  );
}
