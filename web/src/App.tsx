import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/*" Component={UserPage} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
