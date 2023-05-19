import { Form } from '@unform/web';
import { FormLayout } from '../../components/FormLayout';
import { Button, Grid } from '@mui/material';
import { VTextField } from '../../components/VTextField';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../forms/IVFormErros';
import { useAppDataContext } from '../../context/AppDataContext';
import { useNavigate } from 'react-router-dom';

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
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

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
          <VTextField label="Password" name="password" />
          <VTextField label="Repeat the password" name="passwordConfirmation" />
          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </Grid>
      </Form>
    </FormLayout>
  );
}
