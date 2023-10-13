import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { SelectOption } from "../pages/desenvolvedores/utils/types";

export const SelectInput = ({
  options,
  ...props
}: TextFieldProps & { options: SelectOption[] }) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  return (
    <>
      <TextField
        select
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
