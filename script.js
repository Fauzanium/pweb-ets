function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(Number(angka));
}

function simpanData(data) {
    localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(data));
}

const KEY_TRANSAKSI = "dataTransaksi";
const data = ambilData() || []
const formTambah = document.querySelector(".tambah");
formTambah.addEventListener("submit", (e) => {
  e.preventDefault()
  tambahTransaksi(data);
  simpanData(data)
  tampilkan()
})

function tambahTransaksi(datas) {

  const date = new Date();
  const id = `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`
  const kategori = document.querySelector("#ktr")
  const tanggal = document.querySelector("#tanggal")
  const nominal = document.querySelector("#nom");
  if (nominal.value < 0) alert("Nominal harus lebih dari 0")
  const tipe = document.querySelector('input[name="tipe"]:checked')
  const catatan = document.querySelector("#catatan")
  const data = {
    "id": id,
    "tanggal": tanggal.value,
    "kategori": kategori.value,
    "nominal": nominal.value,
    "tipe": tipe.value,
    "catatan": catatan.value || ""
  }
  datas.push(data)
  simpanData(datas)
}

function ambilData() {
    try {
        return JSON.parse(localStorage.getItem(KEY_TRANSAKSI));
    } catch (e) {
        return null;
    }
}

function buatCard(item) {
    const card = document.createElement("article");
    card.className = "card " + item.tipe.toLowerCase();

    const title = document.createElement("div");
    title.className = "title";

    const kategori = document.createElement("span");
    kategori.className = "kategori";
    kategori.textContent = item.kategori;

    const tipe = document.createElement("span");
    tipe.className = "tipe";
    tipe.textContent = item.tipe;

    const tanggals = document.createElement("p")
    tanggals.textContent = item.tanggal;
    title.append(kategori, tipe, tanggals);

    const nominal = document.createElement("div");
    nominal.className = "nominal";
    nominal.textContent = formatRupiah(item.nominal);

    const catatan = document.createElement("p");
    catatan.className = "catatan";
    catatan.textContent = item.catatan;

    const hapusButton = document.createElement("button");
    hapusButton.className = "hapus";
  hapusButton.textContent = "Hapus";
  hapusButton.addEventListener("click", () => {
      const index =  [...document.querySelectorAll(".riwayat .card")].indexOf(card);
      let conf = confirm("Apakah yakin?")
      if (conf) hapusTransaksi(index);
  });


    card.append(title, nominal, catatan, hapusButton);
    return card;
}

function hapusTransaksi(index) {
    data.splice(index, 1);
    simpanData(data);
    tampilkan();
}

function perbaruiRingkasan(daftar) {
    const hitung = (tipe) => daftar
        .filter(item => item.tipe === tipe)
        .reduce((jumlah, item) => jumlah + Number(item.nominal), 0);

    const omset = hitung("Pemasukan");
    const operasional = hitung("Pengeluaran Operasional");
    const pribadi = hitung("Pengeluaran Pribadi");

    document.querySelector("#bersih").textContent = formatRupiah(omset - operasional);
    document.querySelector(".money #total p").textContent = formatRupiah(omset);
    document.querySelector(".money #operasional p").textContent = formatRupiah(operasional);
  document.querySelector(".money #pribadi p").textContent = formatRupiah(pribadi);
}

function tampilkan() {
    const wadah = document.querySelector(".riwayat")
    wadah.innerHTML = "";

    let data = ambilData() || [];
    perbaruiRingkasan(data);

    if (data.length === 0) {
        const kosong = document.createElement("p");
        kosong.className = "kosong";
        kosong.textContent = "Belum ada transaksi.";
        wadah.appendChild(kosong);
        return;
    }

    data.forEach(item => wadah.appendChild(buatCard(item)));
}

tampilkan();
