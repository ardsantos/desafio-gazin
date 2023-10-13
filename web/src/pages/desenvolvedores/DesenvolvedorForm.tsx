import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { api } from "../../api/api";
import { NivelInput } from "../../components/NivelInput";
import { SelectInput } from "../../components/SelectInput";
import { TextInput } from "../../components/TextInput";
import { SnackbarState } from "./DesenvolvedoresList";
import { formatDate, getDateFromLocaleString } from "./utils/formatDate";
import {
  Desenvolvedor,
  DesenvolvedorFormData,
  sexoOptions,
} from "./utils/types";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("O campo é obrigatório"),
  nivelId: Yup.string().required("O campo é obrigatório"),
  sexo: Yup.string().length(1).required("O campo é obrigatório"),
  dataNascimento: Yup.date()
    .transform((_value, originalValue) => {
      try {
        const date = originalValue.split("/");
        const isDayLengthCorrect = date[0].length === 2;
        const isMonthLengthCorrect = date[1].length === 2;
        const isYearLengthCorrect = date[2].length === 4;

        if (
          date.length === 3 &&
          isDayLengthCorrect &&
          isMonthLengthCorrect &&
          isYearLengthCorrect
        ) {
          const newDate = `${date[2]}-${date[1]}-${date[0]}`;
          return new Date(newDate);
        }
        return null;
      } catch (e) {
        return null;
      }
    })
    .required("Insira uma data válida"),
  hobby: Yup.string().required("O campo é obrigatório"),
});

export default function DesenvolvedorForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialValues: DesenvolvedorFormData = {
    nome: "",
    nivelId: "",
    sexo: "",
    dataNascimento: "",
    hobby: "",
  };
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
    useState<DesenvolvedorFormData | null>(null);

  const formatResponseToFormData = (
    desenvolvedor: Desenvolvedor
  ): DesenvolvedorFormData => {
    return {
      nivelId: String(desenvolvedor.Nivel.id),
      nome: desenvolvedor.nome,
      sexo: desenvolvedor.sexo,
      dataNascimento: formatDate(desenvolvedor.dataNascimento),
      hobby: desenvolvedor.hobby,
    };
  };

  const formatFormDataToSubmit = (desenvolvedor: DesenvolvedorFormData) => {
    return {
      nivelId: +desenvolvedor.nivelId,
      nome: desenvolvedor.nome,
      sexo: desenvolvedor.sexo,
      dataNascimento: getDateFromLocaleString(desenvolvedor.dataNascimento),
      hobby: desenvolvedor.hobby,
    };
  };

  const handleSubmit = async (formData: DesenvolvedorFormData) => {
    const dataToSubmit = formatFormDataToSubmit(formData);

    if (editingId) {
      const response = await api.desenvolvedores.update(
        editingId,
        dataToSubmit
      );

      if (response.ok) {
        setSnackBarState({
          open: true,
          severity: "success",
          message: "Desenvolvedor alterado com sucesso",
        });
        navigate("/desenvolvedores");
      } else {
        setSnackBarState({
          open: true,
          severity: "error",
          message: response.data?.message || response.originalError.message,
        });
      }

      return;
    }

    const response = await api.desenvolvedores.create(dataToSubmit);

    if (response.ok) {
      setSnackBarState({
        open: true,
        severity: "success",
        message: "Desenvolvedor criado com sucesso",
      });
      navigate("/desenvolvedores");
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
        const response = await api.desenvolvedores.findOne(id);

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
              <Grid item xs={6}>
                <TextInput
                  name="nome"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <NivelInput
                  name="nivelId"
                  label="Nível"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <SelectInput
                  name="sexo"
                  label="Sexo"
                  variant="outlined"
                  fullWidth
                  options={sexoOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  name="dataNascimento"
                  label="Data de Nascimento"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  name="hobby"
                  label="Hobby"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => navigate("/desenvolvedores")}>
                  Voltar
                </Button>
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
