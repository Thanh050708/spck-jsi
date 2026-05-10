const greeting = document.getElementById("greeting");
const displayName = document.getElementById("display-name");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");

// kiểm tra xem user đã đăng nhập hay chưa
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(user);
    // nếu đã đăng nhập thì hiển thị tên người dùng và ẩn nút đăng nhập
    greeting.classList.remove("hidden");
    displayName.innerText = user.displayName || user.email;
    btnLogin.classList.add("hidden");
    // ...
  } else {
    // nếu chưa đăng nhập thì ẩn tên người dùng và hiển thị nút đăng nhập
    greeting.classList.add("hidden");
    btnLogin.classList.remove("hidden");
  }
});

//đăng xuất khi nhấn vào nút logout
btnLogout.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Đăng xuất thành công!");
    })
    .catch((error) => {
      // An error happened.
    });
});
