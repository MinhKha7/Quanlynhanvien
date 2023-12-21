function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLamThang
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = Number(luongCoBan);
  this.chucVu = chucVu;
  this.gioLamThang = Number(gioLamThang);

  this.tinhTongLuong = function () {
    switch (chucVu) {
      case "Giám đốc":
        tongLuong = (luongCoBan / 26 / 8) * 3 * gioLamThang;
    }
    switch (chucVu) {
      case "Trưởng phòng":
        tongLuong = (luongCoBan / 26 / 8) * 2 * gioLamThang;
    }
    switch (chucVu) {
      case "Nhân viên":
        tongLuong = (luongCoBan / 26 / 8) * 1 * gioLamThang;
    }
    return tongLuong.toFixed(0);
  };

  this.xepLoaiNhanVien = function () {
    if (gioLamThang < 160) {
      var loaiNhanVien = "Trung bình";
    } else if (gioLamThang >= 160) {
      var loaiNhanVien = "Khá";
    } else if (gioLamThang >= 176) {
      var loaiNhanVien = "Giỏi";
    } else if (gioLamThang >= 192) {
      var loaiNhanVien = "Xuất sắc";
    }
    return loaiNhanVien;
  };
}
