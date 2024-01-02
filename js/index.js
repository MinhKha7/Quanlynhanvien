var formNhanVien = new FormNhanVien();

// Load trang ban đầu
function init() {
  var danhSachNhanVien = formNhanVien.layDanhSachNhanVienLocal();
  formNhanVien.listNhanVien = danhSachNhanVien;
  formNhanVien.renderTable();
}
init();
// ==============================================================

// Mở trang điền thông tin nhân viên khi ấn vào Thêm nhân viên
document.querySelector("#btnThem").onclick = function () {
  isEdit = false;
  formNhanVien.renderForm(isEdit);
  document.querySelector("#tknv").removeAttribute("disabled");
  document.querySelector("form.form-nhan-vien").reset();
};
// ==============================================================

// Sự kiện khi nút Thêm/Cập nhật nhân viên được click
document.querySelector("#btnThem_CapNhat").onclick = function () {
  var listEle = document.querySelectorAll(
    ".form-nhan-vien input, .form-nhan-vien select"
  );

  var nv = {};

  listEle.forEach(function (ele) {
    var thuocTinh = ele.id;
    nv[thuocTinh] = ele.value;
  });

  // Xử lý tạm hàm tính toán tại đây để lấy giá trị tổng lương và xếp loại
  var tongLuong = 0;
  function tinhTongLuong(chucVu, luongCoBan, gioLamThang) {
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
  }

  function xepLoaiNhanVien(gioLamThang) {
    if (gioLamThang < 160) {
      var loaiNhanVien = "Trung bình";
    } else if (gioLamThang >= 160 && gioLamThang < 176) {
      var loaiNhanVien = "Khá";
    } else if (gioLamThang >= 176 && gioLamThang < 192) {
      var loaiNhanVien = "Giỏi";
    } else if (gioLamThang >= 192) {
      var loaiNhanVien = "Xuất sắc";
    }
    return loaiNhanVien;
  }

  var eNhanVien = new NhanVien(
    nv.tknv,
    nv.name,
    nv.email,
    nv.password,
    nv.datepicker,
    nv.luongCB,
    nv.chucvu,
    nv.gioLam,
    tinhTongLuong(nv.chucvu, nv.luongCB, nv.gioLam),
    xepLoaiNhanVien(nv.gioLam)
  );

  if (isEdit) {
    formNhanVien.capNhatNhanVien(eNhanVien);
  } else {
    formNhanVien.themNhanVien(eNhanVien);
  }

  document.querySelector("form.form-nhan-vien").reset();

  formNhanVien.luuDanhSachNhanVienLocal();

  formNhanVien.renderTable();
};
// ==============================================================

// Tìm kiếm nhân viên theo xếp loại
document.querySelector("#btnTimNV").onclick = function () {
  var loaiNhanVien = document.querySelector("#searchName").value;
  var danhSachNhanVienTimKiemDuoc =
    formNhanVien.timKiemNhanVienTheoXepLoai(loaiNhanVien);

  formNhanVien.renderTable(danhSachNhanVienTimKiemDuoc);
};
