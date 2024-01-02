function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLamThang,
  tongLuong,
  loaiNhanVien
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = Number(luongCoBan);
  this.chucVu = chucVu;
  this.gioLamThang = Number(gioLamThang);
  this.tongLuong = Number(tongLuong);
  this.loaiNhanVien = loaiNhanVien;
}
