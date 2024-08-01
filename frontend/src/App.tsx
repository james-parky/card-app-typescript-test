import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { EntryContextProvider } from "./contexts/EntryContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";

export default function App() {
  return (
    <section>
      <Router>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
        <NavBar />
        <EntryContextProvider>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryContextProvider>
      </Router>
    </section>
  );
}
