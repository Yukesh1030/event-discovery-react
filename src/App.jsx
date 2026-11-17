import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
