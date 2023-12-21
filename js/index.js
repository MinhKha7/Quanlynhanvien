var formNhanVien = new FormNhanVien();

function init() {
  var danhSachNhanVien = formNhanVien.layDanhSachNhanVienLocal();
  formNhanVien.listNhanVien = danhSachNhanVien;
  formNhanVien.renderTable();
}
init();

// function renderTable() {
//   var eleHtml = ``;

//   formNhanVien.listNhanVien.forEach(function (nv) {
//     eleHtml += `<tr>
//         <th>${nv.taiKhoan}</th>
//         <th>${nv.hoTen}</th>
//         <th>${nv.email}</th>
//         <th>${nv.ngayLam}</th>
//         <th>${nv.chucVu}</th>
//         <th>
//           <button>Sửa</button>
//           <button onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
//         </th>
//       </tr>`;
//   });

//   var tbody = document.querySelector("#tableDanhSach");

//   tbody.innerHTML = eleHtml;
// }
document.querySelector("#btnThemNV").onclick = function (event) {
  //   event.preventDefault();

  var listEle = document.querySelectorAll(
    ".form-nhan-vien input, .form-nhan-vien select"
  );

  var nv = {};

  listEle.forEach(function (ele) {
    var thuocTinh = ele.id;
    nv[thuocTinh] = ele.value;
  });

  var eNhanVien = new NhanVien(
    nv.tknv,
    nv.name,
    nv.email,
    nv.password,
    nv.datepicker,
    nv.luongCB,
    nv.chucvu,
    nv.gioLam
  );

  formNhanVien.themNhanVien(eNhanVien);

  formNhanVien.luuDanhSachNhanVienLocal();

  formNhanVien.renderTable();
};

function xoaNhanVien(taikhoan) {
  formNhanVien.xoaNhanVien(taikhoan);
  formNhanVien.renderTable();
  formNhanVien.luuDanhSachNhanVienLocal();
}
