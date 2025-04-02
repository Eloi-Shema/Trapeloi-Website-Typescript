import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext";
import { CartProvider } from "./contexts/CartContext/CartContext";

const Home = React.lazy(() => import("./Pages/Home/Home"));
const Checkout = React.lazy(() => import("./Pages/Checkout/Checkout"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const Terms = React.lazy(() => import("./Pages/Terms/Terms"));
const Privacy = React.lazy(() => import("./Pages/Privacy/Privacy"));
const About = React.lazy(() => import("./Pages/About/About"));
const Loading = React.lazy(() => import("./utils/Loading/Loading"));
const NotFound = React.lazy(() => import("./utils/NotFound/NotFound"));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
