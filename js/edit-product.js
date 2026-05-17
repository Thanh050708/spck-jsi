const editForm = document.getElementById("edit-product-form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputImage = document.getElementById("image");
const inputDescription = document.getElementById("description");
const editError = document.getElementById("edit-error");
const btnCancel = document.getElementById("btn-cancel");

function getProductIdFromUrl() {
  const rawParam = window.location.search.slice(1);
  if (!rawParam) return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || rawParam;
}

function showError(message) {
  editError.textContent = message;
  editError.classList.remove("d-none");
}

function hideError() {
  editError.textContent = "";
  editError.classList.add("d-none");
}

function fillForm(productData) {
  inputName.value = productData.name || "";
  inputPrice.value = productData.price || "";
  inputImage.value = productData.image || "";
  inputDescription.value = productData.description || productData.note || "";
}

const productId = getProductIdFromUrl();
if (!productId) {
  showError("Không tìm thấy mã sản phẩm. Vui lòng mở lại trang từ danh sách sản phẩm.");
  editForm.classList.add("d-none");
} else {
  const db = firebase.firestore();
  db.collection("products")
    .doc(productId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        showError("Sản phẩm không tồn tại hoặc đã bị xóa.");
        editForm.classList.add("d-none");
        return;
      }
      fillForm(doc.data());
      btnCancel.href = `./product-detail.html?${productId}`;
    })
    .catch((error) => {
      console.error("Lỗi khi tải sản phẩm:", error);
      showError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      editForm.classList.add("d-none");
    });
}

editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideError();

  if (!productId) {
    showError("Không có mã sản phẩm hợp lệ.");
    return;
  }

  const name = inputName.value.trim();
  const price = inputPrice.value.trim();
  const image = inputImage.value.trim();
  const description = inputDescription.value.trim();

  if (!name || !price || !image) {
    showError("Vui lòng điền đầy đủ tên, giá và ảnh sản phẩm.");
    return;
  }

  const updatedProduct = {
    name,
    price: Number(price),
    image,
    description,
  };

  const db = firebase.firestore();
  db.collection("products")
    .doc(productId)
    .update(updatedProduct)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1400,
      }).then(() => {
        window.location.href = "../index.html";
      });
    })
    .catch((error) => {
      console.error("Lỗi cập nhật sản phẩm:", error);
      showError("Cập nhật thất bại. Vui lòng thử lại.");
    });
});
