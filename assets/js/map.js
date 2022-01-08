function initialize() {
  google.maps.event.addDomListener(window, "load", initialize);
}

const titikAwalLat = -8.4605694;
const titikAwalLng = 115.3539297;
const titik = new google.maps.LatLng(titikAwalLat, titikAwalLng);
const propertiPeta = {
  center: titik,
  zoom: 9,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
const peta = new google.maps.Map(
  document.getElementById("googleMap"),
  propertiPeta
);
// even listner ketika peta diklik
google.maps.event.addListener(peta, "click", function (event) {
  buatMarker(this, event.latLng);
});

let marker = new google.maps.Marker({
  position: titik,
  map: peta,
});
const lokasi = document.querySelector("#lokasi");
lokasi.value = `${titikAwalLat}, ${titikAwalLng}`;
lokasi.setAttribute("data-lat", `${titikAwalLat}`);
lokasi.setAttribute("data-lng", `${titikAwalLng}`);

function buatMarker(peta, posisiTitik) {
  if (marker) {
    // pindahkan marker

    marker.setPosition(posisiTitik);
  } else {
    // buat marker baru
    marker = new google.maps.Marker({
      position: posisiTitik,
      map: peta,
    });
  }
  // isi nilai koordinat ke form
  lokasi.value = `${posisiTitik.lat()}, ${posisiTitik.lng()}`;
  lokasi.setAttribute("data-lat", `${posisiTitik.lat()}`);
  lokasi.setAttribute("data-lng", `${posisiTitik.lng()}`);
}
