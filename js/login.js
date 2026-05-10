const loginForm = document.getElementById("login-form");
const btnGoogle = document.getElementById("btnGoogle");

// lắng nghe sự kiện bấm vào nút đăng nhập bằng Google
btnGoogle.addEventListener("click", () => {
  // tạo một provider để đăng nhập với Google
  var provider = new firebase.auth.GoogleAuthProvider();
  // đăng nhập với Google bằng popup
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user; // sau khi đăng nhập thành công thì user sẽ là một object chứa thông tin của người dùng, ví dụ {displayName: "Nguyen Van A", email: "
      console.log(user);
      window.location.href = "/index.html"; // chuyển hướng về trang chủ sau khi đăng nhập thành công
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode, errorMessage);
      alert("Error", errorMessage);
      // ...
    });
});

// lắng nghe event submit của form
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // ngăn chặn hành vị mặc định của form
  console.log(e.target.email.value);
  let email = e.target.email.value;
  let password = e.target.password.value;
  console.log({ email, password });
  Swal.fire({
    title: "Đang đăng nhập...",
    icon: "info",
    didOpen: () => {
      Swal.showLoading();
    },
  });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      Swal.fire({
        title: "Thành công!",
        text: "Đăng nhập thành công.",
        icon: "success",
        willClose: () => {
          // chuyển hướng về trang chủ sau khi đăng nhập thành công
          window.location.href = "/index.html";
        },
      });
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Swal.fire({
        title: "Lỗi!",
        text: "Đã có lỗi xảy ra: " + errorMessage,
        icon: "error",
      });
      // ..
    });
});
