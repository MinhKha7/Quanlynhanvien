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
  formNhanVien.renderButton(isEdit);
  document.querySelector("#tknv").removeAttribute("disabled");
  document.querySelector("form.form-nhan-vien").reset();
  formNhanVien.resetErrors();
};
// ==============================================================

// Sự kiện khi nút Thêm/Cập nhật nhân viên được click
document.querySelector("#btnThem_CapNhat").onclick = function () {
  var listEle = document.querySelectorAll(
    ".form-nhan-vien input, .form-nhan-vien select"
  );

  // Nếu trường hợp sửa thì mới xét Valid theo kiểu isValidForUpdate (không xét trường hợp)
  if (isEdit) {
    if (isValidForUpdate() === false) {
      renderErrors();
      return;
    }
  } else {
    if (isValid() === false) {
      renderErrors();
      return;
    }
  }

  // ===============================================

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
    alert("Cập nhật thành công !");
    document.querySelector("#btnDong").click();
  } else {
    formNhanVien.themNhanVien(eNhanVien);
    alert("Thêm mới thành công !");
    document.querySelector("#btnDong").click();
  }

  formNhanVien.luuDanhSachNhanVienLocal();

  formNhanVien.renderTable();
};
// ====================================================

// Tìm kiếm nhân viên theo xếp loại
document.querySelector("#btnTimNV").onclick = function () {
  var loaiNhanVien = document.querySelector("#searchName").value;
  var danhSachNhanVienTimKiemDuoc =
    formNhanVien.timKiemNhanVienTheoXepLoai(loaiNhanVien);

  formNhanVien.renderTable(danhSachNhanVienTimKiemDuoc);
  document.querySelector("#searchName").value = "";
};
// ====================================================

// ===================== Validate =====================

var listEle = document.querySelectorAll(
  ".form-nhan-vien input, .form-nhan-vien select"
);
var touches = {};
var errors = {};

// Set cho touches có giá trị để xử lý trường hợp chưa nhập đã submit
function setTouches(value) {
  listEle.forEach(function (ele) {
    touches[ele.id] = value;
  });
}
setTouches(false);
// ====================================================

// Kiểm tra dữ liệu nhập có lỗi hay không
function handleValidate(event) {
  var id = event.target.id;
  var value = event.target.value;

  switch (id) {
    case "tknv": {
      errors[id] = new Validator(value)
        .require()
        .available()
        .stringNumber()
        .minString(4)
        .maxString(6)
        .getMessage();
      break;
    }
    case "name": {
      errors[id] = new Validator(value).require().string().getMessage();
      break;
    }
    case "email": {
      errors[id] = new Validator(value).require().email().getMessage();
      break;
    }
    case "password": {
      errors[id] = new Validator(value).require().password().getMessage();
      break;
    }
    case "datepicker": {
      errors[id] = new Validator(value).require().getMessage();
      break;
    }
    case "luongCB": {
      errors[id] = new Validator(value)
        .require()
        .number()
        .minNumber(1_000_000)
        .maxNumber(20_000_000)
        .getMessage();
      break;
    }
    case "chucvu": {
      errors[id] = new Validator(value).require().title().getMessage();
      break;
    }

    case "gioLam": {
      errors[id] = new Validator(value)
        .require()
        .number()
        .minNumber(80)
        .maxNumber(200)
        .getMessage();
      break;
    }
    default:
  }
}
// ====================================================

// Render error message
function renderErrors() {
  listEle.forEach(function (ele) {
    var thuocTinh = ele.id;

    var isShow = errors[thuocTinh] != undefined && touches[thuocTinh];

    // Khi isShow là false thì ngừng render lỗi
    if (!isShow) {
      return;
    }
    // Khi isShow là true
    var nextEle = ele.nextElementSibling;

    var messageHTML = `
                        <span class="form-message">
                          ${errors[thuocTinh]}
                        </span>`;
    if (nextEle) {
      nextEle.innerHTML = messageHTML;
    } else {
      // Tạo mới element form-message
      ele.insertAdjacentHTML("afterend", messageHTML);
    }
  });
}
// =======================================

// Mỗi khi từ trong ô input đi ra thì kiểm tra và render lỗi ngay
function handleBlur(event) {
  // Tạo thuộc tính tương ứng với id đồng thời set giá trị true trong đối tượng touches
  touches[event.target.id] = true;

  handleValidate(event);

  renderErrors();
}

listEle.forEach(function (ele) {
  ele.onblur = handleBlur;
});
// ==========================================

// Kiểm tra form có hợp lệ để submit
function isValid() {
  //TH1: chưa nhập gì hết mà đã submit
  if (Object.values(errors).length !== listEle.length) {
    // Set tất cả touches[thuocTinh] == true thì mới renderErrors được
    setTouches(true);

    // Set để errors[thuocTinh] != undefined thì mới renderErrors được
    listEle.forEach(function (ele) {
      handleValidate({
        target: {
          id: ele.id,
          value: "",
        },
      });
    });
    return false;
  }

  // TH2: Đã nhập đầy đủ
  // Kiểm tra xem tất cả đều đã được đi qua và nhập đúng
  var isTouch = Object.values(touches).every(function (item) {
    return item;
  });

  var isTrue = Object.values(errors).every(function (item) {
    return item.length === 0;
  });

  return isTouch && isTrue;
}
// TH3: Xét lỗi lúc chỉnh sửa (đã nhập đầy đủ nên không xét kiểu TH1)
function isValidForUpdate() {
  var isTouch = Object.values(touches).every(function (item) {
    return item;
  });

  var isTrue = Object.values(errors).every(function (item) {
    return item.length === 0;
  });

  return isTouch && isTrue;
}
// ========================================================================

// Sắp xếp tăng giảm theo tài khoản
document.querySelector("#taiKhoan").onclick = function () {
  var sapXepTang = document.querySelector("#SapXepTang");

  if (sapXepTang.style.display === "inline-block") {
    document.querySelector("#SapXepTang").style.display = "none";
    document.querySelector("#SapXepGiam").style.display = "inline-block";
    formNhanVien.sortTaiKhoan(-1);
  } else {
    document.querySelector("#SapXepTang").style.display = "inline-block";
    document.querySelector("#SapXepGiam").style.display = "none";
    formNhanVien.sortTaiKhoan(1);
  }
};
// ========================================
