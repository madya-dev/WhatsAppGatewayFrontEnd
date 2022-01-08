const device = document.getElementsByClassName("list-perangkat");
const pilihKontak = document.getElementById("pilihKontak");
var modalKontak = new bootstrap.Modal(document.getElementById("kontakModal"));

const perangkatText = document.querySelector("#perangkatText"),
  tujuanText = document.querySelector("#tujuanText"),
  inputText = document.querySelector("#text"),
  perangkatTextVal = document.querySelector("#perangkatTextVal"),
  tujuanTextVal = document.querySelector("#tujuanTextVal"),
  textVal = document.querySelector("#textVal"),
  formText = document.querySelector("#formText");

const perangkatLokasi = document.querySelector("#perangkatLokasi"),
  tujuanLokasi = document.querySelector("#tujuanLokasi"),
  inputLokasi = document.querySelector("#lokasi"),
  perangkatLokasiVal = document.querySelector("#perangkatLokasiVal"),
  tujuanLokasiVal = document.querySelector("#tujuanLokasiVal"),
  lokasiVal = document.querySelector("#lokasiVal"),
  formLokasi = document.querySelector("#formLokasi");

const perangkatFile = document.querySelector("#perangkatFile"),
  tujuanFile = document.querySelector("#tujuanFile"),
  inputFile = document.querySelector("#file"),
  perangkatFileVal = document.querySelector("#perangkatFileVal"),
  tujuanFileVal = document.querySelector("#tujuanFileVal"),
  fileVal = document.querySelector("#fileVal"),
  formFile = document.querySelector("#formFile");

var kontakChecked = [];
var kontakCheckedNama = [];
pilihKontak.addEventListener("click", function () {
  const kontak = document.getElementsByClassName("kontak");

  kontakChecked = [];
  kontakCheckedNama = [];
  for (k = 0; k < kontak.length; k++) {
    if (kontak[k].checked === true) {
      kontakChecked.push(kontak[k].value);
      kontakCheckedNama.push(kontak[k].dataset.nama);
    }
  }
  tujuanText.value = kontakCheckedNama;
  tujuanLokasi.value = kontakCheckedNama;
  tujuanFile.value = kontakCheckedNama;
  modalKontak.hide();
});

function getDevice() {
  let endpointDevice = "https://notme.rupadana.com/user/device";
  // get device

  fetchAPI(endpointDevice, {
    method: "GET",
  })
    .then(status)
    .then(json)
    .then((results) => {
      if (results.error) throw error;
      let perangkatHTML = "";
      results.message.forEach((data) => {
        perangkatHTML +=
          data.status == "ready"
            ? `<option value="${data.idDevice}">${data.device_name}</option>`
            : `<option value="">${data.device_name} (Perangkat Tidak Aktif)</option>`;
      });

      for (x = 0; x < device.length; x++) {
        // device[x].addEventListener("click", function () {});

        device[x].innerHTML =
          perangkatHTML.length > 0
            ? perangkatHTML
            : `<option value="">Tidak ada perangkat</option>`;
      }
    });
}
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
      Authorization: "Bearer " + token,
    },
    ...data,
  });
};
getDevice();

// validation

formText.addEventListener("submit", (e) => {
  e.preventDefault();
  cekInputText();
});
formLokasi.addEventListener("submit", (e) => {
  e.preventDefault();
  cekInputLokasi();
});
formFile.addEventListener("submit", (e) => {
  e.preventDefault();
  cekInputFile();
});

function cekInputText() {
  Swal.fire({
    title: "loading...",
    allowOutsideClick: false,
    onOpen: () => {
      swal.showLoading();
    },
  });
  if (
    tujuanText.value == "" ||
    perangkatText.value == "" ||
    inputText.value == ""
  ) {
    Swal.fire({
      title: "loading...",
      allowOutsideClick: false,
      onOpen: () => {
        swal.close();
      },
    });
    if (perangkatText.value == "") {
      perangkatTextVal.innerText = "Perangkat yang anda pilih tidak aktif!";
      perangkatTextVal.style.color = "#ff0000";
      perangkatText.style.border = "1px solid #ff0000";
    } else {
      perangkatTextVal.innerText = "";
      perangkatText.style.border = "1px solid #BDBDBD";
    }
    if (tujuanText.value == "") {
      tujuanTextVal.innerText = "Tujuan belum dipilih!";
      tujuanTextVal.style.color = "#ff0000";
      tujuanText.style.border = "1px solid #ff0000";
    } else {
      tujuanTextVal.innerText = "";
      tujuanText.style.border = "1px solid #BDBDBD";
    }
    if (inputText.value == "") {
      textVal.innerText = "Pesan belum diisi!";
      textVal.style.color = "#ff0000";
      inputText.style.border = "1px solid #ff0000";
    } else {
      textVal.innerText = "";
      inputText.style.border = "1px solid #BDBDBD";
    }
  } else {
    var endpointSendText = "https://notme.rupadana.com/user/device/sendText";
    for (s = 0; s < kontakChecked.length; s++) {
      console.log(kontakChecked[s]);
      var data = {
        id: perangkatText.value,
        contact: kontakChecked[s],
        message: inputText.value,
      };

      // Fetch API akan dieksekusi secara asynchronous
      fetchAPI(endpointSendText, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(status)
        .then(json)
        .then((results) => {
          if (!results.error) {
            Swal.fire("Berhasil Mengirim Pesan", "", "success");
            namaPerangkat.value = "";

            getDevice();
          } else {
            console.log(results);
            Swal.fire("Gagal Mengirim Pesan", "", "error");
          }
        })
        .catch(error);
    }
  }
}

function cekInputLokasi() {
  Swal.fire({
    title: "loading...",
    allowOutsideClick: false,
    onOpen: () => {
      swal.showLoading();
    },
  });
  if (
    tujuanLokasi.value == "" ||
    perangkatLokasi.value == "" ||
    inputLokasi.value == ""
  ) {
    Swal.fire({
      title: "loading...",
      allowOutsideClick: false,
      onOpen: () => {
        swal.close();
      },
    });
    if (perangkatLokasi.value == "") {
      perangkatLokasiVal.innerText = "Perangkat yang anda pilih tidak aktif!";
      perangkatLokasiVal.style.color = "#ff0000";
      perangkatLokasi.style.border = "1px solid #ff0000";
    } else {
      perangkatLokasiVal.innerText = "";
      perangkatLokasi.style.border = "1px solid #BDBDBD";
    }
    if (tujuanLokasi.value == "") {
      tujuanLokasiVal.innerText = "Tujuan belum dipilih!";
      tujuanLokasiVal.style.color = "#ff0000";
      tujuanLokasi.style.border = "1px solid #ff0000";
    } else {
      tujuanLokasiVal.innerText = "";
      tujuanLokasi.style.border = "1px solid #BDBDBD";
    }
    if (lokasi.value == "") {
      lokasiVal.innerText = "Lokasi belum ditentukan!";
      lokasiVal.style.color = "#ff0000";
      inputLokasi.style.border = "1px solid #ff0000";
    } else {
      lokasiVal.innerText = "";
      inputLokasi.style.border = "1px solid #BDBDBD";
    }
  } else {
    var endpointSendText =
      "https://notme.rupadana.com/user/device/sendLocation";
    for (s = 0; s < kontakChecked.length; s++) {
      var data = {
        id: perangkatLokasi.value,
        contact: kontakChecked[s],
        latitude: inputLokasi.dataset.lat,
        longitude: inputLokasi.dataset.lng,
      };

      // Fetch API akan dieksekusi secara asynchronous
      fetchAPI(endpointSendText, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(status)
        .then(json)
        .then((results) => {
          if (!results.error) {
            Swal.fire("Berhasil Mengirim Pesan", "", "success");
            namaPerangkat.value = "";

            getDevice();
          } else {
            Swal.fire("Gagal Mengirim Pesan", "", "error");
          }
        })
        .catch(error);
    }
  }
}
function cekInputFile() {
  Swal.fire({
    title: "loading...",
    allowOutsideClick: false,
    onOpen: () => {
      swal.showLoading();
    },
  });
  if (
    tujuanFile.value == "" ||
    perangkatFile.value == "" ||
    inputFile.value == ""
  ) {
    Swal.fire({
      title: "loading...",
      allowOutsideClick: false,
      onOpen: () => {
        swal.close();
      },
    });
    if (perangkatFile.value == "") {
      perangkatFileVal.innerText = "Perangkat yang anda pilih tidak aktif!";
      perangkatFileVal.style.color = "#ff0000";
      perangkatFile.style.border = "1px solid #ff0000";
    } else {
      perangkatFileVal.innerText = "";
      perangkatFile.style.border = "1px solid #BDBDBD";
    }
    if (tujuanFile.value == "") {
      tujuanFileVal.innerText = "Tujuan belum dipilih!";
      tujuanFileVal.style.color = "#ff0000";
      tujuanFile.style.border = "1px solid #ff0000";
    } else {
      tujuanFileVal.innerText = "";
      tujuanFile.style.border = "1px solid #BDBDBD";
    }
    if (inputFile.value == "") {
      fileVal.innerText = "File belum di unggah!";
      fileVal.style.color = "#ff0000";
      inputFile.style.border = "1px solid #ff0000";
    } else {
      fileVal.innerText = "";
      inputFile.style.border = "1px solid #BDBDBD";
    }
  } else {
    var endpointSendFile = "https://notme.rupadana.com/user/device/sendFile";
    for (s = 0; s < kontakChecked.length; s++) {
      var data = {
        id: perangkatLokasi.value,
        contact: kontakChecked[s],
        file: inputFile.value,
      };

      // Fetch API akan dieksekusi secara asynchronous
      fetchAPI(endpointSendFile, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(status)
        .then(json)
        .then((results) => {
          if (!results.error) {
            Swal.fire("Berhasil Mengirim Pesan", "", "success");
            namaPerangkat.value = "";

            getDevice();
          } else {
            Swal.fire("Gagal Mengirim Pesan", "", "error");
            console.log(results);
          }
        })
        .catch(error);
    }
  }
}
