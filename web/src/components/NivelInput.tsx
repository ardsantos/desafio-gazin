import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { SelectOption } from "../pages/desenvolvedores/utils/types";

export const NivelInput = (props: TextFieldProps) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.niveis.findAll();

      if (response.ok) {
        const data = response.data!.nodes;

        setOptions(
          data.map((nivel) => {
            return {
              label: nivel.nivel,
              value: String(nivel.id),
            } as SelectOption;
          })
        );
      }
    };

    fetchData();
  }, []);

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
