export class HttpResponse {
  static created(data) {
    return {
      status: "success",
      code: 201,
      message: "Dữ liệu đã được tạo thành công.",
      data,
    };
  }

  static deleted(data) {
    return {
      status: "success",
      code: 204,
      message: "Dữ liệu đã được xóa thành công.",
      data,
    };
  }

  static updated(data) {
    return {
      status: "success",
      code: 200,
      message: "Dữ liệu đã được cập nhật thành công.",
      data,
    };
  }

  static error(data) {
    return {
      status: "error",
      code: 400,
      message: "Thao tác thất bại",
      error: data,
    };
  }

  static paginate(data) {
    return {
      status: "success",
      code: 200,
      message: "Lấy dữ liệu thành công.",
      data,
    };
  }

  static count(count) {
    return {
      status: "success",
      code: 200,
      message: "Điếm số lượng dữ liệu thành công.",
      data: {
        count,
      },
    };
  }

  static get(data) {
    return {
      status: "success",
      code: 200,
      message: "Lấy dữ liệu thành công.",
      data,
    };
  }
}
