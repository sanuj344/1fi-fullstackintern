import { Navigate, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products/nova-x1-5g" replace />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
    </Routes>
  );
}
