import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@components/login/Login";
import ThemThuoc from "@components/pages/ThemThuoc/ThemThuoc";
import SuaThuoc from "@components/pages/SuaThuoc/SuaThuoc";
import NhomPage from "@components/pages/Nhom/NhomPage";
import ThuocsPage from "@components/pages/Thuocs/ThuocsPage";
import ThuocPage from "@components/pages/Thuoc/ThuocPage";
import ThemNhom from "@components/pages/ThemNhom/ThemNhom";
import SuaNhom from "@components/pages/SuaNhom/SuaNhom";
import ThuongHieuPage from "@components/pages/ThuongHieu/ThuongHieuPage";
import ThemThuongHieu from "@components/pages/ThemThuongHieu/ThemThuongHieu";
import SuaThuongHieu from "@components/pages/SuaThuongHieu/SuaThuongHieu";
import DuocChatPage from "@components/pages/DuocChat/DuocChatPage";
import ThemDuocChat from "@components/pages/ThemDuocChat/ThemDuocChat";
import PageNotFound from "@components/PageNotFound/PageNotFound";
import { useGlobal } from "@hooks";
import { useEffect } from "react";
import DonHangPage from "@components/pages/DonHang/DonHangPage";
import ChiTietDonHang from "@components/pages/ChiTietDonHang/ChiTietDonHang";
import PhanCumPage from "@components/pages/PhanCum/PhamCum";

function App() {
  const [global, setGLB] = useGlobal();

  useEffect(() => {
    console.log(global.user);
  }, [global]);

  return (
    <BrowserRouter>
      <Routes>
        {global.user ? (
          <Route path="/">
            <Route path="" element={<ThuocsPage />} />
            <Route path="/nhom" element={<NhomPage />} />
            <Route path="/nhom/them" element={<ThemNhom />} />
            <Route path="/nhom/sua/:id" element={<SuaNhom />} />
            <Route path="/thuong-hieu" element={<ThuongHieuPage />} />
            <Route path="/thuong-hieu/them" element={<ThemThuongHieu />} />
            <Route path="/thuong-hieu/sua/:id" element={<SuaThuongHieu />} />
            <Route path="/duoc-chat" element={<DuocChatPage />} />
            <Route path="/duoc-chat/them" element={<ThemDuocChat />} />
            <Route path="/don-hang" element={<DonHangPage />} />
            <Route path="/don-hang/:id" element={<ChiTietDonHang />} />
            <Route path="/thuoc" element={<ThuocsPage />} />
            <Route path="/thuoc/:id" element={<ThuocPage />} />
            <Route path="/thuoc/them" element={<ThemThuoc />} />
            <Route path="/thuoc/sua/:id" element={<SuaThuoc />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/phan-cum" element={<PhanCumPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        ) : (
          <Route>
            <Route path="*" element={<Login />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
