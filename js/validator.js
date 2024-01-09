/**
 * @param {string} value giá trị người dùng nhập vào.
 */
function Validator(value) {
  this.value = value;
  this.message = "";

  // Không được bỏ trống
  this.require = function (message) {
    if (this.message) return this;

    if (this.value.trim().length === 0) {
      this.message = message || "Không được bỏ trống.";
    }

    return this;
  };

  // Kiểm tra trùng tài khoản
  this.available = function (message) {
    if (this.message) return this;

    if (formNhanVien.timKiemNhanVienTheoTaiKhoan(value)) {
      this.message = message || "Tài khoản đã tồn tại";
    }
    return this;
  };

  // Kiểm tra đúng định dạng số tự nhiên: nguyên + thực
  this.number = function (message) {
    if (this.message) return this;

    var regexNumber = /^-?\d*\.?\d+$/;

    if (!regexNumber.test(this.value.trim())) {
      this.message = message || "Giá trị nhập vào sai định dạng số.";
    }

    return this;
  };

  this.minNumber = function (valueMin, message) {
    if (this.message) return this;

    if (Number(this.value) < valueMin) {
      this.message =
        message ||
        "Không được nhỏ hơn số " + Intl.NumberFormat("vn-VN").format(valueMin);
    }

    return this;
  };

  this.maxNumber = function (valueMax, message) {
    if (this.message) return this;

    if (Number(this.value) > valueMax) {
      this.message =
        message ||
        "Không được lớn hơn số " + Intl.NumberFormat("vn-VN").format(valueMax);
    }

    return this;
  };

  // Toàn bộ là ký tự số
  this.stringNumber = function (message) {
    if (this.message) return this;

    var regexString = /^[0-9]+$/u;

    if (!regexString.test(this.value)) {
      this.message = message || "Yêu cầu toàn bộ là ký tự số";
    }

    return this;
  };

  // Toàn bộ là ký tự chữ
  this.string = function (message) {
    if (this.message) return this;

    var regexString =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/u;

    if (!regexString.test(this.value)) {
      this.message = message || "Yêu cầu toàn bộ là ký tự chữ.";
    }

    return this;
  };

  this.minString = function (valueMin, message) {
    if (this.message) return this;

    if (this.value.trim().length < valueMin) {
      this.message = message || `Không được ít hơn ${valueMin} ký tự.`;
    }

    return this;
  };

  this.maxString = function (valueMax, message) {
    if (this.message) return this;

    if (this.value.trim().length > valueMax) {
      this.message = message || `Không được nhiều hơn ${valueMax} ký tự.`;
    }

    return this;
  };

  // Định dạng email
  this.email = function (message) {
    if (this.message) return this;

    var regexEmail =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!regexEmail.test(this.value)) {
      this.message = message || "Sai định dạng email.";
    }

    return this;
  };

  // Định dạng password
  this.password = function (message) {
    if (this.message) return this;
    var regexPw =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (!regexPw.test(this.value)) {
      this.message =
        message ||
        "Phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    }
    return this;
  };

  // Định dạng chức vụ
  this.title = function (message) {
    if (this.message) return this;

    if (this.value == "Chọn chức vụ") {
      this.message = message || "Không được bỏ trống.";
    }
    return this;
  };

  // method: getter
  this.getMessage = function () {
    return this.message;
  };
}
