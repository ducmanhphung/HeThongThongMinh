import axios from "axios";
import { BASE_URL } from "./Base";

function getAllThuoc(cb1, cb2) {
  axios.get(`${BASE_URL}/thuoc`).then(cb1).catch(cb2);
}

function getPageThuoc(pageIndex, cb1, cb2) {
  console.log(`Page sned: ${pageIndex}`);
  axios
    .get(`${BASE_URL}/thuoc/page`, {
      params: {
        pageIndex: pageIndex,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getByNhomVaThuongHieuPage(page, idNhom, idThuongHieu, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuoc/thuonghieuvanhompage`, {
      params: {
        idThuongHieu: idThuongHieu,
        idNhom: idNhom,
        page: page,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function getThuocById(idThuoc, cb1, cb2) {
  axios.get(`${BASE_URL}/thuoc/${idThuoc}`).then(cb1).catch(cb2);
}

function checkTenThuoc(tenThuoc, cb1, cb2) {
  axios
    .get(`${BASE_URL}/thuoc/checktenthuoc`, { params: { tenThuoc: tenThuoc } })
    .then(cb1)
    .catch(cb2);
}

function taoThuoc(thuocDto, cb1, cb2) {
  axios.post(`${BASE_URL}/thuoc/taothuoc`, thuocDto).then(cb1).catch(cb2);
}

function suaThuoc(thuocDto, cb1, cb2) {
  axios.put(`${BASE_URL}/thuoc/suathuoc`, thuocDto).then(cb1).catch(cb2);
}

function xoaThuoc(idThuoc, cb1, cb2) {
  axios
    .delete(`${BASE_URL}/thuoc/xoathuoc`, {
      params: {
        idThuoc,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function themHinhAnhThuoc(fileHinhAnh, idThuoc, cb1, cb2) {
  console.log(idThuoc);
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("idThuoc", idThuoc);

  axios
    .post(`${BASE_URL}/thuoc/themhinhanh`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

function suaHinhAnhThuoc(fileHinhAnh, idThuoc, tenHinhAnhCu, cb1, cb2) {
  const formData = new FormData();
  formData.append("hinhAnh", fileHinhAnh);
  formData.append("idThuoc", idThuoc);
  formData.append("tenHinhAnhCu", tenHinhAnhCu);

  axios
    .post(`${BASE_URL}/thuoc/suahinhanh`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data;`,
      },
    })
    .then(cb1)
    .catch(cb2);
}

export {
  getAllThuoc,
  getPageThuoc,
  checkTenThuoc,
  taoThuoc,
  suaThuoc,
  xoaThuoc,
  suaHinhAnhThuoc,
  themHinhAnhThuoc,
  getThuocById,
  getByNhomVaThuongHieuPage,
};
