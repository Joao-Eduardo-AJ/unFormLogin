import { Form } from '@unform/web';
import { FormLayout } from '../../components/FormLayout';
import { Button, Grid } from '@mui/material';
import { VTextField } from '../../components/VTextField';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';

interface ISubmitData {
  email: string;
  password: string;
}

export function Register() {
  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm = (data: ISubmitData) => console.log(data);

  return (
    <FormLayout>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Grid container gap={1}>
          <VTextField label="Email" name="email" />
          <VTextField label="Password" name="password" />
          <VTextField label="Repeat the password" name="repeat" />
          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </Grid>
      </Form>
    </FormLayout>
  );
}
