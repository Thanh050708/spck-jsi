// Import mảng linh kiện từ file mock-data.js
import { linhkien } from "./mock-data.js";

// 1. Lấy phần tử HTML có id là "components-grid" để hiển thị danh sách linh kiện
const danhSachLinhKien = document.getElementById("components-grid");

// 2. Hiển thị sản phẩm ra giao diện
linhkien.forEach((p) => {
  // 3. Tạo một thẻ div mới cho mỗi linh kiện
  const productDiv = document.createElement("div");
  // Gán class cho thẻ div để áp dụng CSS, ban đầu có cả class "component-highlight" (sau này đã bỏ)
  productDiv.className = "component-card component-highlight";

  // 4. Tạo nội dung HTML cho thẻ div bằng template string, chèn dữ liệu từng linh kiện
  productDiv.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">
                        <img src=${p.image} />
                    </div>
                    <h2>${p.ten}</h2> 
                </div>
                <div class="card-body">
                    <h3>${p.ten_en}</h3> 
                    <p>${p.mo_ta}</p> <!-- Mô tả -->
                    <p><strong>Ký hiệu:</strong> ${p.ky_hieu}</p> <!-- Thông tin bổ sung -->
                    <p><strong>Đơn vị:</strong> ${p.don_vi}</p>
                </div>
        `;

  // 5. Thêm thẻ div vừa tạo vào danh sách linh kiện trong HTML
  danhSachLinhKien.appendChild(productDiv);
});

// 6. Hàm tìm kiếm linh kiện theo tên (không phân biệt hoa thường)
function timTheoTen(name) {
  return linhkien.filter(p => p.ten.toLowerCase().includes(name.toLowerCase()));
}

// 7. Thêm sự kiện click cho nút tìm kiếm
document.getElementById("searchBtn").addEventListener("click", () => {
  // Lấy giá trị từ ô input tìm kiếm
  const keyword = document.getElementById("searchInput").value;
  // Gọi hàm tìm kiếm
  const ketQua = timTheoTen(keyword);

  // Lấy phần tử để hiển thị kết quả
  const resultDiv = document.getElementById("result");
  // Xóa nội dung cũ
  resultDiv.innerHTML = "";

  // 8. Nếu không tìm thấy sản phẩm nào
  if (ketQua.length === 0) {
    resultDiv.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
  } else {
    // 9. Duyệt qua mảng kết quả và hiển thị từng sản phẩm
    ketQua.forEach(sp => {
      resultDiv.innerHTML += `
        <div class="component-card">
          <div class="card-header">
            <div class="card-icon">
              <img src=${sp.image} />
            </div>
            <h2>${sp.ten}</h2> 
          </div>
          <div class="card-body">
            <h3>${sp.ten_en}</h3> 
            <p>${sp.mo_ta}</p>
            <p><strong>Ký hiệu:</strong> ${sp.ky_hieu}</p>
            <p><strong>Đơn vị:</strong> ${sp.don_vi}</p>
          </div>
        </div>
      `;
    });
  }
});

// 10. Đoạn code dưới đây lặp lại việc hiển thị linh kiện, nhưng đã sửa class "component-highlight" thành không dùng nữa
linhkien.forEach((p) => {
  // Tạo một thẻ div mới cho mỗi linh kiện
  const productDiv = document.createElement("div");
  
  // Chỉ sử dụng class "component-card", bỏ class "component-highlight" để xóa viền xanh
  productDiv.className = "component-card";
  
  // Tạo nội dung HTML cho thẻ div, sử dụng dữ liệu từ mảng linhkien
  productDiv.innerHTML = `
    <div class="card-header">
      <div class="card-icon">
        <!-- Hiển thị ảnh linh kiện với alt text để SEO và accessibility -->
        <img src="${p.image}" alt="${p.ten}" />
      </div>
      <!-- Hiển thị tên linh kiện tiếng Việt -->
      <h2>${p.ten}</h2> 
    </div>
    <div class="card-body">
      <!-- Hiển thị tên linh kiện tiếng Anh -->
      <h3>${p.ten_en}</h3> 
      <!-- Hiển thị mô tả linh kiện -->
      <p>${p.mo_ta}</p>
      <!-- Hiển thị ký hiệu linh kiện -->
      <p><strong>Ký hiệu:</strong> ${p.ky_hieu}</p>
      <!-- Hiển thị đơn vị tính của linh kiện -->
      <p><strong>Đơn vị:</strong> ${p.don_vi}</p>
    </div>
  `;
  
  // Thêm thẻ div vừa tạo vào danh sách linh kiện trong HTML
  danhSachLinhKien.appendChild(productDiv);
});