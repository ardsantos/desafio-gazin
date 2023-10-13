import { TextField, TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

export const TextInput = (props: TextFieldProps) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  return (
    <>
      <TextField
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};
