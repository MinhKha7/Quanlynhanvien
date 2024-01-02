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
    this.renderTable();
    this.luuDanhSachNhanVienLocal();
  };
  // =========================================

  // Tìm nhân viên theo xếp loại
  this.timKiemNhanVienTheoXepLoai = function (loainhanvien) {
    if (loainhanvien === undefined || loainhanvien === "") {
      return this.listNhanVien;
    }
    var tempListNhanVien = this.listNhanVien.filter(function (nv) {
      // return nv.loaiNhanVien === loainhanvien;
      // return nv.loaiNhanVien.toLowerCase().includes(loainhanvien.toLowerCase());
      return nv.loaiNhanVien.toLowerCase() === loainhanvien.toLowerCase();
    });
    return tempListNhanVien;
  };
  // =========================================

  // Tìm nhân viên theo tài khoản
  this.timKiemNhanVienTheoTaiKhoan = function (mnv) {
    if (mnv === undefined || mnv === "") return;
    var nhanVien = this.listNhanVien.find(function (nv) {
      return nv.taiKhoan === mnv;
    });
    return nhanVien;
  };
  // =========================================

  // Render dữ liệu cũ lên form
  this.renderDuLieuLenForm = function (nv) {
    var listEle = document.querySelectorAll(
      ".form-nhan-vien input, .form-nhan-vien select"
    );

    var mapper = {
      // id trên html: "property" của NhanVien ,
      tknv: "taiKhoan",
      name: "hoTen",
      email: "email",
      password: "matKhau",
      datepicker: "ngayLam",
      luongCB: "luongCoBan",
      chucvu: "chucVu",
      gioLam: "gioLamThang",
    };

    listEle.forEach(function (ele) {
      var property = mapper[ele.id];
      ele.value = nv[property];
    });
  };
  // =========================================

  // Render Button Thêm - Sửa
  this.renderForm = function (isEdit) {
    var title = document.querySelector("#myModal #header-title");
    // Lấy element button thêm nhân viên hay chỉnh sửa
    var btn = document.querySelector("button#btnThem_CapNhat");

    if (isEdit) {
      title.innerHTML = "Cập nhật nhân viên";
      btn.innerHTML = "Cập nhật nhân viên";
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-success");
    } else {
      title.innerHTML = "Điền thông tin nhân viên";
      btn.innerHTML = "Thêm nhân viên";
      btn.classList.add("btn-success");
      btn.classList.remove("btn-primary");
    }
  };
  // =========================================

  // Chỉnh sửa nhân viên
  this.chinhSuaNhanVien = function (mnv) {
    var nhanVien = this.timKiemNhanVienTheoTaiKhoan(mnv);
    this.renderDuLieuLenForm(nhanVien);
    isEdit = true;
    this.renderForm(isEdit);
    document.querySelector("#tknv").disabled = true;
  };
  // =========================================

  // Cập nhật nhân viên
  this.capNhatNhanVien = function (nv) {
    var index = this.listNhanVien.findIndex(function (nhanVien) {
      return nhanVien.taiKhoan === nv.taiKhoan;
    });
    if (index === -1) return;

    this.listNhanVien[index] = nv;
  };

  // Render table
  this.renderTable = function (tempListNhanVien) {
    var eleHtml = ``;

    if (!tempListNhanVien) {
      tempListNhanVien = this.listNhanVien;
    }

    tempListNhanVien.forEach(function (nv) {
      eleHtml += `<tr>
        <th>${nv.taiKhoan}</th>
        <th>${nv.hoTen}</th>
        <th>${nv.email}</th>
        <th>${nv.ngayLam}</th>
        <th>${nv.chucVu}</th>
        <th>${nv.tongLuong}</th>
        <th>${nv.loaiNhanVien}</th>
        <th>
          <button onclick="formNhanVien.chinhSuaNhanVien('${nv.taiKhoan}')" class="btn btn-primary" id="btnSua" data-toggle="modal" data-target="#myModal">
                    Sửa
                  </button>
          <button onclick="formNhanVien.xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
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
