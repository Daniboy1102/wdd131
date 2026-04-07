//Data for product
const products = [
  { id: "fc-1888", name: "flux capacitor",     averagerating: 4.5 },
  { id: "fc-2050", name: "power laces",        averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits",      averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor",averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer",     averagerating: 5.0 }
];

//Dropdown menu
const selectEl = document.getElementById("productName");
if (selectEl) {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    selectEl.appendChild(option);
  });
}

//Review counter
const countEl = document.getElementById("reviewCount");
if (countEl) {
  // Increment counter when confirmation page loads
  let count = parseInt(localStorage.getItem("reviewCount") || "0");
  count++;
  localStorage.setItem("reviewCount", count);
  countEl.textContent = count;
}

//Date
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = document.lastModified;
}