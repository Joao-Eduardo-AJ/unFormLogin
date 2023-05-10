import { Form } from '@unform/web';
import { FormLayout } from '../../components/FormLayout';
import { Button, Grid } from '@mui/material';
import { VTextField } from '../../components/VTextField';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import * as yup from 'yup';
import { IVFormErrors } from '../../forms/IVFormErros';

interface ISubmitData {
  email: string;
  password: string;
  passwordConfirmation: string;
  [key: string]: any;
}

const formValidationSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must be the same')
      .required(),
  })
  .noUnknown()
  .defined();

export function Register() {
  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm = (data: ISubmitData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        if (validatedData instanceof Error) {
          alert(Error);
        } else {
          alert(validatedData);
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
