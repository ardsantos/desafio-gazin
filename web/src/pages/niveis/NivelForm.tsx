import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { api } from "../../api/api";
import { TextInput } from "../../components/TextInput";
import { SnackbarState } from "./NiveisList";
import { Nivel, NivelFormData } from "./utils/types";

const validationSchema = Yup.object().shape({
  nivel: Yup.string().required("O campo é obrigatório"),
});

export default function NivelForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialValues = { nivel: "" };
  const snackBarInitialValues: SnackbarState = {
    open: false,
    severity: "success",
    message: "",
  };

  const [snackBarState, setSnackBarState] = useState<SnackbarState>(
    snackBarInitialValues
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [withDataInitialValues, setWithDataInitialValues] =
    useState<NivelFormData | null>(null);

  const formatResponseToFormData = (nivel: Nivel): NivelFormData => {
    return {
      nivel: nivel.nivel,
    };
  };

  const handleSubmit = async (formData: NivelFormData) => {
    if (editingId) {
      const response = await api.niveis.update(editingId, formData);

      if (response.ok) {
        setSnackBarState({
          open: true,
          severity: "success",
          message: "Nível alterado com sucesso",
        });
        navigate("/niveis");
      } else {
        setSnackBarState({
          open: true,
          severity: "error",
          message: response.data?.message || response.originalError.message,
        });
      }

      return;
    }

    const response = await api.niveis.create(formData);

    if (response.ok) {
      setSnackBarState({
        open: true,
        severity: "success",
        message: "Nível criado com sucesso",
      });
      navigate("/niveis");
    } else {
      setSnackBarState({
        open: true,
        severity: "error",
        message: response.data?.message || response.originalError.message,
      });
    }
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarState(snackBarInitialValues);
  };

  useEffect(() => {
    const path = pathname.split("/").filter(Boolean);

    if (path[1] === "edit") {
      const id = +path[2];
      setEditingId(id);

      const fetchData = async () => {
        const response = await api.niveis.findOne(id);

        if (response.ok) {
          const data = response.data!;

          setWithDataInitialValues(formatResponseToFormData(data));
        } else {
          setSnackBarState({
            open: true,
            severity: "error",
            message: response.data?.message || response.originalError.message,
          });
        }
      };

      fetchData();
    } else {
      setEditingId(null);
      setWithDataInitialValues(null);
    }
  }, [pathname]);

  return (
    <>
      <Formik
        initialValues={withDataInitialValues || initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  name="nivel"
                  label="Nível"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => navigate("/niveis")}>Voltar</Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit">Salvar</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackBarState.severity}
          sx={{ width: "100%" }}
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
