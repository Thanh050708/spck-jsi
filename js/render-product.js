const productContainer = document.getElementById("product-container");

const db = firebase.firestore();

let html = ``;
db.collection("products")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const product = doc.data();

      html += `    <div class="card" style="width: 18rem">
            <img src=${product.image} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text text-danger fw    -bold fs-4">
                ${Number(product.price).toLocaleString()}đ
              </p>
              <a href="./html/product-detail.html?${doc.id}"  class="btn btn-primary">View detail</a>
            </div>
          </div>`;
      productContainer.innerHTML += html;
    });
  });
