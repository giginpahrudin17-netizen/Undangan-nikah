AOS.init({
    duration: 1200,
    once: true
});

function BukaUndangan() {

    // Memutar musik
    const musik = document.getElementById("bg-music");
    musik.play();

    // Scroll ke isi undangan
    document.getElementById("isi-undangan").scrollIntoView({
        behavior: "smooth"
    });

}

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

if (lightbox && lightboxImg && closeBtn) {

    galleryImages.forEach((img) => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

}

const tujuan = new Date("October 17, 2026 09:00:00").getTime();

setInterval(function () {

    const sekarang = new Date().getTime();

    const selisih = tujuan - sekarang;

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));

    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById("hari").innerHTML = hari;
    document.getElementById("jam").innerHTML = jam;
    document.getElementById("menit").innerHTML = menit;
    document.getElementById("detik").innerHTML = detik;

}, 1000);

// Countdown
// kode countdown...

// =======================
// RSVP
// =======================

const form = document.getElementById("rsvp-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value,
        kehadiran: document.getElementById("kehadiran").value,
        ucapan: document.getElementById("ucapan").value
    };

    fetch("https://script.google.com/macros/s/AKfycbwwVFVAk30JqRkmLTLWXKyrOTCJ23FfPiIEQEO8onuM20_2ObHHosWpiQk8HQHJ0d2fXQ/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {

        document.getElementById("pesan").innerHTML =
        "✅ Terima kasih, RSVP berhasil dikirim.";

        form.reset();

        loadTamu(); // Memuat ulang buku tamu

    })
    .catch(error => {

        document.getElementById("pesan").innerHTML =
        "❌ Gagal mengirim data.";

        console.log(error);

    });
});

function loadTamu() {

    fetch("https://script.google.com/macros/s/AKfycbwwVFVAk30JqRkmLTLWXKyrOTCJ23FfPiIEQEO8onuM20_2ObHHosWpiQk8HQHJ0d2fXQ/exec")
    .then(response => response.json())
    .then(data => {

        const daftar = document.getElementById("daftar-tamu");

        daftar.innerHTML = "";

        data.reverse();

        data.forEach(item => {

            daftar.innerHTML += `
                <div class="tamu">
                    <h3>${item[0]}</h3>
                    <p><strong>${item[1]}</strong></p>
                    <p>${item[2]}</p>
                </div>
            `;

        });

    });

}

loadTamu();

function copyRekening(){

    const rekening =
    document.getElementById("norek").innerText;

    navigator.clipboard.writeText(rekening);

    alert("Nomor rekening berhasil disalin.");

}

const params = new URLSearchParams(window.location.search);

const tamu = params.get("to");

if(tamu){

    document.getElementById("nama-tamu").innerHTML =
    decodeURIComponent(tamu);

}

// =======================
// Nama Tamu dari URL
// =======================

const namaTamu = params.get("to");

if (namaTamu) {

    document.getElementById("nama-tamu").textContent =
        decodeURIComponent(namaTamu);

}

// kode Anda
// countdown
// musik
// galeri