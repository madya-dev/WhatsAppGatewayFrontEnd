const inputNamaPengguna = document.querySelector("#namaPengguna");
const inputKataSandi = document.querySelector("#kataSandi");
const namaPenggunaVal = document.querySelector("#namaPenggunaVal");
const kataSandiVal = document.querySelector("#kataSandiVal");
const salah = document.querySelector("#salah");
const form = document.querySelector("#form");

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token !== null) {
  window.location = "perangkat.html";
}

if (form !== null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
}
function login() {
  if (inputNamaPengguna.value == "" || inputKataSandi.value == "") {
    if (inputNamaPengguna.value == "") {
      namaPenggunaVal.innerText = "Nama Pengguna belum diisi!";
      namaPenggunaVal.style.color = "#ff0000";
      inputNamaPengguna.style.border = "1px solid #ff0000";
      salah.innerText = "";
    } else {
      namaPenggunaVal.innerText = "";
      inputNamaPengguna.style.border = "1px solid #BDBDBD";
    }
    if (inputKataSandi.value == "") {
      salah.innerText = "";
      kataSandiVal.innerText = "Nama Pengguna belum diisi!";
      kataSandiVal.style.color = "#ff0000";
      inputKataSandi.style.border = "1px solid #ff0000";
    } else {
      kataSandiVal.innerText = "";
      inputKataSandi.style.border = "1px solid #BDBDBD";
    }
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
    var endpointLogin = "https://notme.rupadana.com/user/auth",
      data = {
        username: namaPengguna.value,
        password: kataSandi.value,
      };

    // Fetch API akan dieksekusi secara asynchronous
    const remember = document.querySelector("#ingatSaya");
    fetchAPI(endpointLogin, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(status)
      .then(json)
      .then((results) => {
        if (!results.error) {
          if (remember.checked) {
            localStorage.setItem("token", results.token);
          } else {
            sessionStorage.setItem("token", results.token);
          }
          window.location = "perangkat.html";
        } else {
          namaPenggunaVal.innerText = "";
          namaPenggunaVal.style.color = "#bdbdbd";
          inputNamaPengguna.style.border = "1px solid #ff0000";
          kataSandiVal.innerText = "";
          kataSandiVal.style.color = "#bdbdbd";
          inputKataSandi.style.border = "1px solid #ff0000";
          salah.innerText = "Nama pengguna / kata sandi salah!";
          salah.style.color = "#ff0000";
          console.log(results);
        }
      })
      .catch(error);
  }
}
