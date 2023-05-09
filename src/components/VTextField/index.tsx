import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import { useStyles } from '../../styles/styles';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField = ({ name, ...props }: TVTextFieldProps) => {
  const { classes } = useStyles();
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const inputRef = useRef();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => ref.current.value,
      setValue: (ref, value) => (ref.current.value = value),
      clearValue: ref => (ref.current.value = ''),
    });
  }, [registerField, fieldName]);

  return (
    <TextField
      {...props}
      className={classes.textField}
      inputRef={inputRef}
      name={name}
      defaultValue={defaultValue}
      size="small"
      fullWidth
      error={!!error}
      helperText={error}
      onFocus={() => error && clearError()}
      color="primary"
    />
  );
};
