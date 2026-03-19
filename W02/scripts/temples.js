//footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

//hambuerguer
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  //Switch icon
  hamburger.innerHTML   = isOpen ? '&#x2715;' : '&#9776;';
  hamburger.setAttribute('aria-expanded', isOpen);
});