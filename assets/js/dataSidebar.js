const baseURL = "http://127.0.0.1:5500/";
const menu = [
  {
    title: "",
    nav: [
      {
        nama: "Dashboard",
        link: baseURL + "dashboard.html",
        icon: "fa-tachometer-alt",
      },
    ],
  },

  {
    title: "Interface",
    nav: [
      {
        nama: "Kirim Pesan",
        link: baseURL + "kirim-pesan.html",
        icon: "fa-envelope",
      },
      {
        nama: "Pesan Terjadwal",
        link: baseURL + "pesan-terjadwal.html",
        icon: "fa-clock",
      },
      {
        nama: "Respon Otomatis",
        link: baseURL + "respon-otomatis.html",
        icon: "fa-robot",
      },
      {
        nama: "Pesan Terkirim",
        link: baseURL + "pesan-terkirim.html",
        icon: "fa-history",
      },
      {
        nama: "Perangkat ",
        link: baseURL + "perangkat.html",
        icon: "fa-mobile-alt",
      },
    ],
  },
];

export default menu;
