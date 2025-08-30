import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LogIn";  
import PropertiesPage from "./Pages/Properties";
import RegisterPage from "./Pages/Register";
import MyBookingsPage from "./Pages/MyBookings";
import AdminPage from "./Pages/adminPage";
import EditProperty from "./Pages/EditProperty";
import FavoritesPage from "./Pages/favoritesPage";
import 'bootstrap-icons/font/bootstrap-icons.css';
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mybookings" element={<MyBookingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
         <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/admin/edit-property/:id" element={<EditProperty />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

