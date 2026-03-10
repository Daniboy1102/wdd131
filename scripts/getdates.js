//last modified date
//Current year in footer
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

//Last modified date
const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.innerHTML = "Last Modification: " + document.lastModified;
}