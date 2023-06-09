import { Form } from '@unform/web';
import { FormLayout } from '../../shared/components/FormLayout';
import { Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { VTextField } from '../../shared/forms/VTextField';
import { useState } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../shared/forms/IVFormErros';
import { useAppDataContext } from '../../shared/contexts/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useVForm } from '../../shared/forms/useVForm';
import { TextsProvider } from '../../translation/appTranslation';

interface ISubmitData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const formValidationSchema: yup.ObjectSchema<ISubmitData> = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
});

export function Register() {
  const { userRegister } = useAppDataContext();
  const { formRef, register } = useVForm();
  const navigate = useNavigate();
  const texts = TextsProvider.get();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitForm = (data: ISubmitData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        if (validatedData instanceof Error) {
          alert(Error);
        } else {
          userRegister(validatedData)
            ? navigate('/login')
            : navigate('/registeredusers');
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
          <VTextField
            label={texts.REPEAT_LABEL}
            name="passwordConfirmation"
            type="password"
          />
          <Button variant="contained" onClick={register} fullWidth>
            {texts.REGISTER_BUTTON}
          </Button>
        </Grid>
      </Form>
    </FormLayout>
  );
}
