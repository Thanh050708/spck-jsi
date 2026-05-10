
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const formDky = document.getElementById("form-dky");
// bước 2: Tạo hàm xử lý đăng ký
function registration_processing(event) {
  event.preventDefault();
  const name = username.value.trim();
  const emailvalue = email.value.trim();
  const pass = password.value;
  const passw = confirmPassword.value;
  const role_id = 2; // 1 admin 2 user
  if (!name || !pass || !emailvalue) {
    alert("please enter information");
    return;
  } else if (pass !== passw) {
    alert("enter confirmPass again");
    return;
  }
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
    let userData = {
      name,
      emailvalue,
      pass,
      role_id,
      balance: 0 
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

}
