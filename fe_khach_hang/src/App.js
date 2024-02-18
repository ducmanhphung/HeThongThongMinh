import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormDoiMK from "@components/FormDoiMK/FormDoiMK";
import ProductPage from "@components/Pages/ProductPage/ProductPage";
import HomePage from "@components/Pages/HomePage/HomePage";
import CartPage from "@components/Pages/CartPage/CartPage";
import OrderPage from "@components/Pages/OrderPage/OrderPage";
import LoginForm from "@components/LoginForm/LoginForm";
import RegisterForm from "@components/RegisterForm/RegisterForm";
import ProfilePage from "@components/Pages/ProfilePage/ProfilePage";
import ChiTietDonHang from "@components/Pages/ChiTietDonHang/ChiTietDonHang";
import TmpPage from "@components/Pages/TmpPage/TmpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="order/:id" element={<ChiTietDonHang />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="repassword" element={<FormDoiMK />} />
          <Route path="tmp/:id" element={<TmpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
