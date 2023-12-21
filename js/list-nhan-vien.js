function FormNhanVien() {
  // Danh sách nhân viên
  this.listNhanVien = [];
  // =========================================

  // Thêm nhân viên
  this.themNhanVien = function (nv) {
    this.listNhanVien.push(nv);
  };
  // =========================================

  // Xóa nhân viên
  this.xoaNhanVien = function (taikhoan) {
    if (this.listNhanVien.length === 0) return;

    var newListNhanVien = this.listNhanVien.filter(function (nv) {
      return !(nv.taiKhoan === taikhoan);
    });

    this.listNhanVien = newListNhanVien;
  };
  // =========================================

  // Tìm nhân viên theo xếp loại
  this.timKiemNhanVienTheoXepLoai = function (loainhanvien) {
    if (loainhanvien === undefined || loainhanvien === "") {
      return this.listNhanVien;
    }
    var tempListNhanVien = this.listNhanVien.filter(function (nv) {
      return nv.loaiNhanVien === loainhanvien;
    });
    return tempListNhanVien;
  };
  // =========================================

  // Cập nhật nhân viên
  // this.capNhatNhanVien = function (nv) {
  //   var index = this.listNhanVien.findIndex(function (nhanVien) {
  //     return nhanVien.taiKhoan === nv.taiKhoan;
  //   });
  //   if (index === -1) return;

  //   this.listNhanVien[index] = nv;
  // };

  // Render table
  this.renderTable = function () {
    var eleHtml = ``;

    //Khai báo lại function "Tính tổng lương"
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

    // Khai báo lại function "Xếp loại nhân viên"
    function xepLoaiNhanVien(gioLamThang) {
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
    }

    this.listNhanVien.forEach(function (nv) {
      eleHtml += `<tr>
        <th>${nv.taiKhoan}</th>
        <th>${nv.hoTen}</th>
        <th>${nv.email}</th>
        <th>${nv.ngayLam}</th>
        <th>${nv.chucVu}</th>
        <th>${tinhTongLuong(nv.chucVu, nv.luongCoBan, nv.gioLamThang)}</th>
        <th>${xepLoaiNhanVien(nv.gioLamThang)}</th>
        <th>
          <button>Sửa</button>
          <button onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
        </th>
      </tr>`;
    });

    var tbody = document.querySelector("#tableDanhSach");

    tbody.innerHTML = eleHtml;
  };
  // =========================================

  // Lưu danh sách nhân viên vào local
  this.luuDanhSachNhanVienLocal = function () {
    localStorage.setItem("dsnv", JSON.stringify(this.listNhanVien));
  };
  // =========================================

  // Lấy danh sách nhân viên từ local
  this.layDanhSachNhanVienLocal = function () {
    var res = localStorage.getItem("dsnv");

    // Kiểm tra xem thử localStorage có chứa dữ liệu của key: dssv hay không.
    if (res) {
      return JSON.parse(res);
    }

    return [];
  };
  // =========================================
}
