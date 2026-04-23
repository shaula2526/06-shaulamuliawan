// =========================
// DATA (JSON / Object)
// =========================
const mahasiswa = [
    { id: 1, nama: "Andi" },
    { id: 2, nama: "Budi" },
    { id: 3, nama: "Citra" }
];

// =========================
// FUNCTION (Modular - DRY)
// =========================
function tampilkanData(data) {
    return data.map(item => `
        <li>${item.id} - ${item.nama}</li>
    `).join("");
}

// =========================
// RENDER KE HTML
// =========================
function render() {
    const container = document.getElementById("data");

    container.innerHTML = `
        <ul>
            ${tampilkanData(mahasiswa)}
        </ul>
    `;
}

// =========================
// JALANKAN
// =========================
render();
