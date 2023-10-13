import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  AlertColor,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { formatDate } from "./utils/formatDate";
import { Desenvolvedor } from "./utils/types";

export interface SnackbarState {
  open: boolean;
  severity: AlertColor;
  message: string;
}

export default function DesenvolvedoresList() {
  const navigate = useNavigate();
  const snackBarInitialValues: SnackbarState = {
    open: false,
    severity: "success",
    message: "",
  };

  const [data, setData] = useState<Desenvolvedor[]>([]);
  const [listChangedFlag, setListChangedFlag] = useState<boolean>(false);
  const [snackBarState, setSnackBarState] = useState<SnackbarState>(
    snackBarInitialValues
  );
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.desenvolvedores.findAll();

      if (response.ok) {
        const data = response.data!;

        setData(data);
      } else {
        setSnackBarState({
          open: true,
          severity: "error",
          message: response.data?.message || response.originalError.message,
        });
      }
    };

    fetchData();
    // }, [currentPage, rowsPerPage]);
  }, [listChangedFlag]);

  const handleEditClick = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteClick = async (id: number) => {
    const response = await api.desenvolvedores.delete(id);

    if (response.ok) {
      setSnackBarState({
        open: true,
        severity: "success",
        message: "Desenvolvedor removido com sucesso",
      });
      setListChangedFlag(!listChangedFlag);
    } else {
      setSnackBarState({
        open: true,
        severity: "error",
        message: response.data?.message || response.originalError.message,
      });
    }
  };

  // const handleChangePage = (event, newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarState(snackBarInitialValues);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Nível</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Hobby</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.Nivel.nivel}</TableCell>
                <TableCell>{row.sexo}</TableCell>
                <TableCell>{formatDate(row.dataNascimento)}</TableCell>
                <TableCell>{row.hobby}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      onClick={() => handleEditClick(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remover">
                    <IconButton
                      aria-label="remover"
                      onClick={() => handleDeleteClick(row.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
        component="div"
        count={100} // Total number of records, from the pagination information returned by the API
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        <Tooltip title="Adicionar Registro">
          <Button aria-label="add new record" onClick={() => navigate("new")}>
            <AddIcon />
          </Button>
        </Tooltip>
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
      </TableContainer>
    </>
  );
}
