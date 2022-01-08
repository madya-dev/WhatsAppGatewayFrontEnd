const inputPesan = document.querySelector("#pesan");
const inputLokasi = document.querySelector("#lokasi");
const inputTujuan = document.querySelector("#tujuan");
const inputTanggal = document.querySelector("#tanggal");
const inputWaktu = document.querySelector("#waktu");
const inputFile = document.querySelector("#file");
const inputKeyword = document.querySelector("#keyword");
const pesanVal = document.querySelector("#pesanVal");
const lokasiVal = document.querySelector("#lokasiVal");
const tujuanVal = document.querySelector("#tujuanVal");
const tanggalVal = document.querySelector("#tanggalVal");
const waktuVal = document.querySelector("#waktuVal");
const fileVal = document.querySelector("#fileVal");
const keywordVal = document.querySelector("#keywordVal");
const formKirimPesan = document.querySelector("#formKirimPesan");
const formResponOtomatis = document.querySelector("#formResponOtomatis");
if (formKirimPesan !== null) {
  formKirimPesan.addEventListener("submit", (e) => {
    e.preventDefault();
    cekInputKirimPesan();
  });
} else if (formResponOtomatis !== null) {
  formResponOtomatis.addEventListener("submit", (e) => {
    e.preventDefault();

    cekInputReponOtomatis();
  });
}
function cekInputReponOtomatis() {
  if (inputKeyword.value == "") {
    pesanVal.innerText = "";
    pesanVal.style.color = "#BDBDBD";
    inputPesan.style.border = "1px solid #BDBDBD";
    lokasiVal.innerText = "";
    lokasiVal.style.color = "#BDBDBD";
    inputLokasi.style.border = "1px solid #BDBDBD";
    keywordVal.innerText = "Kata kunci belum diisi!";
    keywordVal.style.color = "#ff0000";
    inputKeyword.style.border = "1px solid #ff0000";
  } else if (inputPesan.value == "" && inputLokasi.value == "") {
    keywordVal.innerText = "";
    inputKeyword.style.border = "1px solid #BDBDBD";
    if (inputPesan.value == "" && inputLokasi.value == "") {
      pesanVal.innerText =
        "Silakan tambahkan pesan / lokasi yang mau anda kirim!";
      pesanVal.style.color = "#ff0000";
      inputPesan.style.border = "1px solid #ff0000";
      lokasiVal.innerText =
        "Silakan tambahkan pesan / lokasi yang mau anda kirim!";
      lokasiVal.style.color = "#ff0000";
      inputLokasi.style.border = "1px solid #ff0000";
    } else {
      pesanVal.innerText = "";
      pesanVal.style.color = "#BDBDBD";
      inputPesan.style.border = "1px solid #BDBDBD";
      lokasiVal.innerText = "";
      lokasiVal.style.color = "#BDBDBD";
      inputLokasi.style.border = "1px solid #BDBDBD";
    }
  } else {
    formResponOtomatis.submit();
  }
}
