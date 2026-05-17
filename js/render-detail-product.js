const detailName = document.getElementById("detail-name");
const detailPrice = document.getElementById("detail-price");
const detailImage = document.getElementById("detail-image");
const detailDescription = document.getElementById("detail-description");
const detailMeta = document.getElementById("detail-meta");
const detailError = document.getElementById("detail-error");
const detailActions = document.getElementById("detail-actions");
const btnEdit = document.getElementById("btn-edit");
const btnDelete = document.getElementById("btn-delete");

function getProductIdFromUrl() {
  const rawParam = window.location.search.slice(1);
  if (!rawParam) return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || rawParam;
}

function setActionVisibility(show) {
  if (!detailActions) return;
  detailActions.classList.toggle("d-none", !show);
}

function showError(message) {
  detailError.textContent = message;
  detailError.classList.remove("d-none");
  setActionVisibility(false);
  detailName.textContent = "";
  detailPrice.textContent = "";
  detailDescription.textContent = "";
  detailImage.src = "";
  detailImage.alt = "";
  detailMeta.textContent = "";
}

function renderDetail(productId, productData) {
  detailName.textContent = productData.name || "Không có tên sản phẩm";
  detailPrice.textContent = productData.price
    ? `${Number(productData.price).toLocaleString("vi-VN")} đ`
    : "Giá chưa cập nhật";
  detailDescription.textContent = productData.description || productData.note || "Không có mô tả chi tiết.";
  detailImage.src = productData.image || "https://via.placeholder.com/600x400?text=No+Image";
  detailImage.alt = productData.name || "Ảnh sản phẩm";
  detailMeta.textContent = `Mã sản phẩm: ${productId}`;
  setActionVisibility(true);
}

const productId = getProductIdFromUrl();
if (!productId) {
  showError("Không tìm thấy mã sản phẩm. Vui lòng mở lại trang từ danh sách sản phẩm.");
} else {
  const db = firebase.firestore();
  db.collection("products")
    .doc(productId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        showError("Sản phẩm không tồn tại hoặc đã bị xóa.");
        return;
      }
      renderDetail(productId, doc.data());
    })
    .catch((error) => {
      console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      showError("Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.");
    });
}

if (btnEdit) {
  btnEdit.addEventListener("click", () => {
    if (!productId) return;
    window.location.href = `./edit-product.html?${productId}`;
  });
}

if (btnDelete) {
  btnDelete.addEventListener("click", () => {
    if (!productId) return;
    Swal.fire({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const db = firebase.firestore();
        db.collection("products")
          .doc(productId)
          .delete()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Đã xóa",
              text: "Sản phẩm đã được xóa.",
              timer: 1400,
              showConfirmButton: false,
            }).then(() => {
              window.location.href = "../index.html";
            });
          })
          .catch((error) => {
            console.error("Lỗi xóa sản phẩm:", error);
            Swal.fire({
              icon: "error",
              title: "Xóa thất bại",
              text: "Không thể xóa sản phẩm. Vui lòng thử lại.",
            });
          });
      }
    });
  });
}
