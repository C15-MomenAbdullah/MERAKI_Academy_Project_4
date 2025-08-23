import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LogIn";  
import PropertiesPage from "./Pages/Properties";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

