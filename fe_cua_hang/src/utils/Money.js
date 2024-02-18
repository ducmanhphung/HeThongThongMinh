function formatTienVietNam(number) {
  if (isNaN(number)) {
    return "0 VNĐ";
  }

  // Sử dụng hàm toLocaleString để định dạng số và thêm đơn vị VNĐ
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export { formatTienVietNam };
