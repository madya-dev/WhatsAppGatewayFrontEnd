const namaPerangkat = document.querySelector("#namaPerangkat");
const namaPerangkatVal = document.querySelector("#namaPerangkatVal");
const form = document.querySelector("#form");
const tablePerangkat = document.querySelector("#tablePerangkat");
const btnScan = document.getElementsByClassName("scan");
const btnDelete = document.getElementsByClassName("btn-delete");

var tambahModal = new bootstrap.Modal(document.getElementById("tambahModal"));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkDevice();
});

function checkDevice() {
  Swal.fire({
    title: "loading...",
    allowOutsideClick: false,
    onOpen: () => {
      swal.showLoading();
    },
  });
  if (namaPerangkat.value == "") {
    Swal.fire({
      title: "loading...",
      allowOutsideClick: false,
      onOpen: () => {
        swal.close();
      },
    });
    namaPerangkatVal.innerText = "Nama Perangkat belum diisi!";
    namaPerangkatVal.style.color = "#ff0000";
    namaPerangkat.style.border = "1px solid #ff0000";
  } else {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    var fetchAPI = (url, data) => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        ...data,
      });
    };

    // Ini contoh penggunaannya
    var endpointCreateDevice = "https://notme.rupadana.com/user/device/create",
      data = {
        device_name: namaPerangkat.value,
      };

    // Fetch API akan dieksekusi secara asynchronous
    fetchAPI(endpointCreateDevice, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(status)
      .then(json)
      .then((results) => {
        if (!results.error) {
          Swal.fire("Berhasil Menambahkan Perangkat", "", "success");
          namaPerangkat.value = "";
          tambahModal.hide();

          getDevice();
        } else {
          Swal.fire("Gagal Menambahkan Perangkat", "", "error");
        }
      })
      .catch(error);
  }
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
      let number = 1;

      results.message.forEach((data) => {
        perangkatHTML += `       <tr>
      <td style="min-width: 50px">${number++}</td>
      <td style="min-width: 150px">${data.device_name}</td>
      <td style="min-width: 150px">${
        data.account_number === null
          ? "Tidak ada nomor"
          : `+` + data.account_number
      }</td>
      <td style="width: 300px">${
        data.status === "qrcode"
          ? "Belum Scan QR Code"
          : data.status === "ready"
          ? "Active"
          : "Menunggu QR Code"
      }</td>
      <td class="text-center">
        <button
        id="scan"
         class="btn btn-success m-1 scan"
        data-toggle="modal"
        data-target ="#qrModal"
        data-id="${
          data.idDevice
        }"><i class="fa fa-fw fa-qrcode"></i> Scan</button
        >
  
        <button data-id="${data.idDevice}"
         class="btn btn-danger m-1 btn-delete" id="btn-delete"
          ><i class="fa fa-fw fa-trash"></i> Hapus</button
        >
      </td>
    </tr>
  `;
      });
      if (tablePerangkat.children.length >= results.message.length) {
        clearInterval();
      }

      tablePerangkat.innerHTML = perangkatHTML;
      deleteDevice();
      qrCode();
    });
}

getDevice();

function qrCode() {
  for (i = 0; i < btnScan.length; i++) {
    var intervalQrCode;
    btnScan[i].addEventListener("click", function () {
      const el = this;
      if (intervalQrCode) clearInterval(intervalQrCode);
      intervalQrCode = setInterval(function () {
        fetch("https://notme.rupadana.com/user/device/status", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "POST",
          body: JSON.stringify({
            id: el.dataset.id,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.error) throw error;
            if (response.message == "qrcode") {
              var qrcodeWrapper = document.getElementById("qrcode");
              qrcodeWrapper.innerHTML = "";
              var qrcode = new QRCode(document.getElementById("qrcode"));
              var data = `${response.qrcode}`;

              qrcode.makeCode(data);
            }
          });
      }, 5000);
    });
  }
}

function deleteDevice() {
  for (x = 0; x < btnDelete.length; x++) {
    btnDelete[x].addEventListener("click", function () {
      console.log("ok");
      fetch("https://notme.rupadana.com/user/device/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify({
          id: this.dataset.id,
        }),
      })
        .then(status)
        .then(json)
        .then((results) => {
          if (!results.error) {
            namaPerangkat.value = "";

            Swal.fire("Berhasil Menambahkan Perangkat", "", "success");

            getDevice();
          } else {
            Swal.fire("Gagal Menghapus Perangkat", "", "error");
          }
        })
        .catch(error);
    });
  }
}
