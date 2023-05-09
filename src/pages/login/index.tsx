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

export function Login() {
  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm = (data: ISubmitData) => console.log(data);

  return (
    <FormLayout>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Grid container gap={2}>
          <VTextField label="email" name="email" />
          <VTextField label="password" name="password" />
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </Grid>
      </Form>
    </FormLayout>
  );
}
