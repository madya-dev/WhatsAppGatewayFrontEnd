const perangkatHistory = document.querySelector("#perangkatHistory");
console.log(perangkatHistory.selected == true);

function getDevice() {
  let endpointDevice = "https://notme.rupadana.com/user/device";
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
            ? `<option value="${data.idDevice}" >${data.device_name}</option>`
            : `<option value="">${data.device_name} (Perangkat Tidak Aktif)</option>`;
      });

      perangkatHistory.innerHTML =
        perangkatHTML.length > 0
          ? perangkatHTML
          : `<option value="">Tidak ada perangkat</option>`;
    });
}

function getMessage() {
  let endpointDevice = "https://notme.rupadana.com/user/device/log";
  //   for (s = 0; s < deviceHistorySelected.length; s++) {
  //     console.log(deviceHistorySelected[s].selected);
  //     var data = {
  //       id: perangkatText.value,
  //     };
  //   }
  fetchAPI(endpointDevice, {
    method: "POST",
    // body: JSON.stringify(data),
  })
    .then(status)
    .then(json)
    .then((results) => {
      if (results.error) throw error;
      let perangkatHTML = "";
      results.message.forEach((data) => {
        perangkatHTML +=
          data.status == "ready"
            ? `<option value="${data.idDevice}" class='deviceHistory'>${data.device_name}</option>`
            : `<option value="">${data.device_name} (Perangkat Tidak Aktif)</option>`;
      });

      perangkatHistory.innerHTML =
        perangkatHTML.length > 0
          ? perangkatHTML
          : `<option value="">Tidak ada perangkat</option>`;
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
getMessage();
