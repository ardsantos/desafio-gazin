import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Nivel } from "../pages/niveis/utils/types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "nivel", headerName: "Nível" },
];

export default function DataTable({ data }: { data: Nivel[] }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        // pageSizeOptions={[5, 10]}
        autoHeight
        disableRowSelectionOnClick
        paginationMode="server"
      />
    </div>
  );
}
