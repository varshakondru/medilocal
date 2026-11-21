const defaultMedicines = [
  { name: "Dolo 650", generic: "Paracetamol 650mg", shop: "Apollo Pharmacy, Lakshmipuram", price: "₹30", inStock: true },
  { name: "Jan Aushadhi Paracetamol", generic: "Paracetamol 650mg", shop: "Jan Aushadhi Kendra, Arundelpet", price: "₹10", inStock: true },
  { name: "Augmentin 625", generic: "Amoxicillin + Clavulanate", shop: "MedPlus, Pattabhipuram", price: "₹220", inStock: false }
];

let medicines = JSON.parse(localStorage.getItem("medilocal_meds")) || defaultMedicines;
let currentToken = parseInt(localStorage.getItem("medilocal_current")) || 12;
let lastBookedToken = parseInt(localStorage.getItem("medilocal_last")) || 15;

function saveData() {
  localStorage.setItem("medilocal_meds", JSON.stringify(medicines));
  localStorage.setItem("medilocal_current", currentToken);
  localStorage.setItem("medilocal_last", lastBookedToken);
}

function switchView(view) {
  document.getElementById("patientView").style.display = view === "patient" ? "block" : "none";
  document.getElementById("adminView").style.display = view === "admin" ? "block" : "none";
  document.getElementById("btnPatient").classList.toggle("active", view === "patient");
  document.getElementById("btnAdmin").classList.toggle("active", view === "admin");
  renderAll();
}

function renderPatientMedicines() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("medicineResults");
  container.innerHTML = "";
  medicines
    .filter(m => m.name.toLowerCase().includes(query) || m.generic.toLowerCase().includes(query))
    .forEach(m => {
      container.innerHTML += `<div class="item"><div><strong>${m.name}</strong> (${m.generic}) - <b>${m.price}</b><br/><small>${m.shop}</small></div><span>${m.inStock ? "✅ In Stock" : "❌ Out"}</span></div>`;
    });
}

function renderAdminMedicines() {
  const container = document.getElementById("adminMedicineList");
  container.innerHTML = "";
  medicines.forEach((m, index) => {
    container.innerHTML += `<div class="item"><div><strong>${m.name}</strong> (${m.price})<br/><small>${m.shop}</small></div><button class="toggle-btn" onclick="toggleStock(${index})">${m.inStock ? "Mark Out of Stock" : "Mark In Stock"}</button></div>`;
  });
}

function toggleStock(index) {
  medicines[index].inStock = !medicines[index].inStock;
  saveData();
  renderAll();
}

function addMedicine() {
  const name = document.getElementById("newMedName").value.trim();
  const generic = document.getElementById("newMedGeneric").value.trim();
  const shop = document.getElementById("newMedShop").value.trim();
  const price = document.getElementById("newMedPrice").value.trim();
  if (!name || !shop) return alert("Please enter at least Medicine Name and Pharmacy!");
  medicines.unshift({ name, generic: generic || "Generic", shop, price: price || "₹0", inStock: true });
  saveData();
  renderAll();
}

function bookToken() {
  lastBookedToken++;
  saveData();
  const wait = Math.max(0, (lastBookedToken - currentToken) * 10);
  document.getElementById("userToken").innerText = `#${lastBookedToken} (Est. wait: ${wait} mins)`;
}

function nextPatient() {
  currentToken++;
  saveData();
  renderAll();
}

function renderAll() {
  document.getElementById("currentToken").innerText = currentToken;
  document.getElementById("adminCurrentToken").innerText = currentToken;
  renderPatientMedicines();
  renderAdminMedicines();
}

renderAll();
