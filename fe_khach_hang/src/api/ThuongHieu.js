import axios from "axios";
import { BASE_URL } from "./Base";

function getAllThuongHieu(cb1, cb2) {
  axios.get(`${BASE_URL}/thuonghieu`).then(cb1).catch(cb2);
}

function getPageThuongHieu(pageIndex, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuonghieu/page`, {
      params: {
        pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function checkTenThuongHieu(tenThuongHieu, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuonghieu/checktenthuonghieu`, {
      params: { tenThuongHieu },
    })
    .then(cb1)
    .catch(cb2);
}

function xoaThuongHieu(idThuongHieu, cb1, cb2) {
  axios
    .delete(`${BASE_URL}/thuonghieu/xoa`, {
      params: {
        idThuongHieu,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getThuongHieuById(idThuongHieu, cb1, cb2) {
  axios.get(`${BASE_URL}/thuonghieu/${idThuongHieu}`).then(cb1).catch(cb2);
}
function taoThuongHieu(tenThuongHieu, fileHinhAnh, cb1, cb2) {
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("tenthuongHieu", tenThuongHieu);

  axios
    .post(`${BASE_URL}/thuonghieu/tao`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function suaThuongHieu(
  idThuongHieu,
  tenThuongHieu,
  fileHinhAnh,
  tenHinhAnhCu,
  cb1,
  cb2
) {
  const formData = new FormData();
  formData.append("idThuongHieu", idThuongHieu);
  formData.append("tenThuongHieu", tenThuongHieu);
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("tenHinhAnhCu", tenHinhAnhCu);

  axios
    .put(`${BASE_URL}/thuonghieu/sua`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

export {
  getAllThuongHieu,
  getPageThuongHieu,
  checkTenThuongHieu,
  taoThuongHieu,
  suaThuongHieu,
  xoaThuongHieu,
  getThuongHieuById,
};
