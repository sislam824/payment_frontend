import React from "react";
import "./App.css";
import { CartProvider } from "./components/CartContext";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fetchdata from "./components/Fetchdata";
import Cartpage from "./components/Cartpage";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Notfoundpage from "./components/Notfoundpage";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Fetchdata />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
