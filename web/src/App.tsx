import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import DesenvolvedorForm from "./pages/desenvolvedores/DesenvolvedorForm";
import DesenvolvedoresList from "./pages/desenvolvedores/DesenvolvedoresList";
import NiveisList from "./pages/niveis/NiveisList";
import NivelForm from "./pages/niveis/NivelForm";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/niveis" Component={NiveisList} />
          <Route path="/niveis/*" Component={NivelForm} />

          <Route path="/desenvolvedores" Component={DesenvolvedoresList} />
          <Route path="/desenvolvedores/*" Component={DesenvolvedorForm} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
