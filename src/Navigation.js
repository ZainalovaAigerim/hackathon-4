import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import AddNewProduct from "./pages/AddNewProduct";
import EditProductPage from "./pages/EditProductPage";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";

function Navigation() {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/admin/add" element={<AddNewProduct />} />
            <Route path="/admin/edit/:id" element={<EditProductPage />} />
            <Route path="/basket" element={<CartPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
}

export default Navigation;
