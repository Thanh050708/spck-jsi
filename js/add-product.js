const formAddProduct = document.getElementById("form-add-product");

formAddProduct.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(formAddProduct);

  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");

  if (!name.trim()) {
    Swal.fire({
      icon: "error",
      title: "Product name is required",
      willClose: () => {
        document.getElementById("name").focus();
      },
    });
    return;
  }

  if (!price.trim()) {
    Swal.fire({
      icon: "error",
      title: "Price is required",
      willClose: () => {
        document.getElementById("price").focus();
      },
    });
    return;
  }

  if (!image.trim()) {
    Swal.fire({
      icon: "error",
      title: "Image is required",
      willClose: () => {
        document.getElementById("image").focus();
      },
    });
    return;
  }

  const newProduct = { name, price, image };
  console.log(newProduct);
  Swal.fire({
    icon: "loading",
    title: "Loading...",
    showConfirmButton: false,
  });
  const db = firebase.firestore();
  db.collection("products")
    .add(newProduct)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        icon: "success",
        title: "Add product successfully",
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Swal.fire({
        icon: "error",
        title: "Add product failed",
        text: error.message,
      });
    });
});
