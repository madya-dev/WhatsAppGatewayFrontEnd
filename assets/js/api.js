const email = document.querySelector("#email");
const namaDepan = document.querySelector("#namaDepan");
const namaBelakang = document.querySelector("#namaBelakang");
const namaPengguna = document.querySelector("#namaPengguna");
const kataSandi = document.querySelector("#kataSandi");
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
    console.log(results);
  })
  .catch(error);
