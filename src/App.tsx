import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Terms from "./Pages/Terms/Terms";
import Privacy from "./Pages/Privacy/Privacy";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext";
import About from "./Pages/About/About";
import Checkout from "./Pages/Checkout/Checkout";
import { CartProvider } from "./contexts/CartContext/CartContext";
import NotFound from "./utils/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
