function formatRp(n) {
  if(n == null || n == undefined) return `Rp0`
  return `Rp${n}`
}

const data = JSON.parse(localStorage.getItem("dataTransaksi")) || []
const formTambah = document.querySelector(".tambah");
formTambah.addEventListener("submit", (e) => {
  e.preventDefault()
  tambahTransaksi(data);
  localStorage.setItem("dataTransaksi", JSON.stringify(data))
})

function tambahTransaksi(datas) {

  const date = new Date();
  const id = `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`
  console.log(id)
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
}
