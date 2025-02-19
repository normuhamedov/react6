import { Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import ProductCard from "../components/ProductCard";
import Liked from "../pages/Liked";
import Basket from "../pages/Basket";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<Liked />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card/:id" element={<ProductCard />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default AppRoutes;

