const inputEmail = document.querySelector("#email");
const inputNamaDepan = document.querySelector("#namaDepan");
const inputNamaBelakang = document.querySelector("#namaBelakang");
const inputNamaPengguna = document.querySelector("#namaPengguna");
const inputKataSandi = document.querySelector("#kataSandi");
const inputKonfirmasiKataSandi = document.querySelector("#konfirmasiKataSandi");
const emailVal = document.querySelector("#emailVal");
const namaDepanVal = document.querySelector("#namaDepanVal");
const namaBelakangVal = document.querySelector("#namaBelakangVal");
const namaPenggunaVal = document.querySelector("#namaPenggunaVal");
const kataSandiVal = document.querySelector("#kataSandiVal");
const konfirmasiKataSandiVal = document.querySelector(
  "#konfirmasiKataSandiVal"
);

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token !== null) {
  window.location = "perangkat.html";
}

const form = document.querySelector("#form");
if (form !== null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
  });
}
function checkInputs() {
  if (
    inputNamaDepan.value == "" ||
    inputNamaBelakang.value == "" ||
    inputNamaPengguna.value == "" ||
    inputNamaPengguna.value.length < 5 ||
    inputEmail.value == "" ||
    inputKataSandi.value == "" ||
    inputKonfirmasiKataSandi.value != inputKataSandi.value ||
    validateEmail(inputEmail.value) !== true ||
    inputNamaPengguna.value == "madya" ||
    inputEmail.value == "madya@gmail.com"
  ) {
    if (inputNamaDepan.value == "") {
      namaDepanVal.innerText = "Nama depan tidak boleh kosong!";
      namaDepanVal.style.color = "#ff0000";
      inputNamaDepan.style.border = "1px solid #ff0000";
    } else {
      namaDepanVal.innerText = "";
      inputNamaDepan.style.border = "1px solid #BDBDBD";
    }
    if (inputNamaBelakang.value == "") {
      namaBelakangVal.innerText = "Nama Belakang tidak boleh kosong!";
      namaBelakangVal.style.color = "#ff0000";
      inputNamaBelakang.style.border = "1px solid #ff0000";
    } else {
      namaBelakangVal.innerText = "";
      inputNamaBelakang.style.border = "1px solid #BDBDBD";
    }
    if (inputNamaPengguna.value == "") {
      namaPenggunaVal.innerText = "Nama Pengguna tidak boleh kosong!";
      namaPenggunaVal.style.color = "#ff0000";
      inputNamaPengguna.style.border = "1px solid #ff0000";
    } else {
      namaPenggunaVal.innerText = "";
      inputNamaPengguna.style.border = "1px solid #BDBDBD";
    }
    if (inputNamaPengguna.value.length < 5) {
      namaPenggunaVal.innerText = "Nama Pengguna minimal 5 karakter!";
      namaPenggunaVal.style.color = "#ff0000";
      inputNamaPengguna.style.border = "1px solid #ff0000";
    } else {
      namaPenggunaVal.innerText = "";
      inputNamaPengguna.style.border = "1px solid #BDBDBD";
    }
    if (inputEmail.value == "") {
      emailVal.innerText = "Alamat email tidak boleh kosong!";
      emailVal.style.color = "#ff0000";
      inputEmail.style.border = "1px solid #ff0000";
    }
    if (inputKataSandi.value == "") {
      kataSandiVal.innerText = "Kata sandi tidak boleh kosong!";
      kataSandiVal.style.color = "#ff0000";
      inputKataSandi.style.border = "1px solid #ff0000";
    } else {
      kataSandiVal.innerText = "";
      inputKataSandi.style.border = "1px solid #BDBDBD";
    }
    if (inputKonfirmasiKataSandi.value != inputKataSandi.value) {
      konfirmasiKataSandiVal.innerText = "Kata sandi tidak sama!";
      konfirmasiKataSandiVal.style.color = "#ff0000";
      inputKonfirmasiKataSandi.style.border = "1px solid #ff0000";
    } else {
      konfirmasiKataSandiVal.innerText = "";
      inputKonfirmasiKataSandi.style.border = "1px solid #BDBDBD";
    }
    if (validateEmail(inputEmail.value) === true) {
      emailVal.innerText = "";
      inputEmail.style.border = "1px solid #BDBDBD";
    }
    if (validatePassword(inputKataSandi.value) === true) {
      kataSandiVal.innerText = "";
      inputKataSandi.style.border = "1px solid #BDBDBD";
    }
  } else if (validateEmail(inputEmail.value) !== true) {
    emailVal.innerText = "alamat email tidak valid!";
    emailVal.style.color = "#ff0000";
    inputEmail.style.border = "1px solid #ff0000";
  } else if (validatePassword(inputKataSandi.value) !== true) {
    kataSandiVal.innerText =
      "password minimal 8 karakter dan mengandung 1 huruf kapital, 1 huruf kecil, dan 1 angka!";
    kataSandiVal.style.color = "#ff0000";
    inputKataSandi.style.border = "1px solid #ff0000";
  } else {
    // Digunakan untuk cek status code yang diberikan dari API
    // Jika statusnya bukan 200 maka return Promise reject
    // Promise reject new error akan masuk ke method catch
    function status(response) {
      if (response.status != 200) {
        console.log(`Error: Status code ${response.status}`);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
    }

    // Merubah response menjadi bentuk JSON
    function json(response) {
      return response.json();
    }

    // Digunakan untuk handle error dari catch
    function error(error) {
      console.log("error: " + error);
    }

    var fetchAPI = (url, data) => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...data,
      });
    };

    // Ini contoh penggunaannya
    var endpointRegister = "https://notme.rupadana.com/user",
      data = {
        firstname: namaDepan.value,
        lastname: namaBelakang.value,
        username: namaPengguna.value,
        email: email.value,
        password: kataSandi.value,
      };

    // Fetch API akan dieksekusi secara asynchronous
    fetchAPI(endpointRegister, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(status)
      .then(json)
      .then((results) => {
        // console.log(results);
        if (!results.error) {
          window.location = "masuk.html";
        } else {
          if (results.message == "Username telah digunakan") {
            namaPenggunaVal.innerText = "Nama Pengguna sudah digunakan!";
            namaPenggunaVal.style.color = "#ff0000";
            inputNamaPengguna.style.border = "1px solid #ff0000";
            emailVal.innerText = "";
            emailVal.style.color = "#bdbdbd";
            inputEmail.style.border = "1px solid #bdbdbd";
          } else if ("Email telah digunakan") {
            namaPenggunaVal.innerText = "";
            namaPenggunaVal.style.color = "";
            inputNamaPengguna.style.border = "1px solid #bdbdbd";
            emailVal.innerText = "Email sudah terdaftar!";
            emailVal.style.color = "#ff0000";
            inputEmail.style.border = "1px solid #ff0000";
          } else {
            console.log(results);
            console.log("gagal");
            Swal.fire("Pendaftaran Gagal", "", "error");
          }
        }
      })
      .catch(error);
  }
}
if (form !== null) {
  inputEmail.addEventListener("keyup", function () {
    if (validateEmail(this.value)) {
      emailVal.innerText = "Alamat email valid.";
      emailVal.style.color = "#00ff00";
    } else if (this.value.length < 1) {
      emailVal.innerText = "";
      emailVal.style.color = "#ff0000";
    } else {
      emailVal.innerText = "alamat email tidak valid!";
      emailVal.style.color = "#ff0000";
    }
  });
}

function validateEmail(elementValue) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}
function validatePassword(elementValue) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordPattern.test(elementValue);
}
