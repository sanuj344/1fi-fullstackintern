import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductList from "./pages/ProductList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
    </Routes>
  );
}
