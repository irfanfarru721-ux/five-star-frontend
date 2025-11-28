import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ModulesPage from "./pages/ModulesPage.jsx";
import VendorsPage from "./pages/VendorsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";

export default function App(){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/modules' element={<ModulesPage/>} />
        <Route path='/modules/:moduleId/vendors' element={<VendorsPage/>} />
        <Route path='/vendor/:vendorId/products' element={<ProductsPage/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
    </>
  );
}
