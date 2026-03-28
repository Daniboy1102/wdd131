//tmples data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  //3 more temples to round out the list
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 5",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17260,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  }
];

//build cards
function createCards(list) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  list.forEach(temple => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><span>Location:</span> ${temple.location}</p>
        <p><span>Dedicated:</span> ${temple.dedicated}</p>
        <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;
    gallery.appendChild(figure);
  });
}

//filter logic
function filterTemples(filter) {
  switch (filter) {
    case 'old':
      return temples.filter(t => parseInt(t.dedicated) < 1900);
    case 'new':
      return temples.filter(t => parseInt(t.dedicated) > 2000);
    case 'large':
      return temples.filter(t => t.area > 90000);
    case 'small':
      return temples.filter(t => t.area < 10000);
    default:
      return temples;
  }
}


//nav click handler
document.getElementById('main-nav').addEventListener('click', e => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();

  const filter = e.target.dataset.filter;
  const titles = { all: 'All Temples', old: 'Old Temples', new: 'New Temples', large: 'Large Temples', small: 'Small Temples' };

  document.getElementById('gallery-title').textContent = titles[filter];
  createCards(filterTemples(filter));

  //close nav on mobile
  document.getElementById('main-nav').classList.remove('open');
  document.getElementById('hamburger').innerHTML = '&#9776;';
  document.getElementById('hamburger').setAttribute('aria-expanded', false);
});

//hamburger click handler
document.getElementById('hamburger').addEventListener('click', () => {
  const nav = document.getElementById('main-nav');
  const isOpen = nav.classList.toggle('open');
  document.getElementById('hamburger').innerHTML = isOpen ? '&#x2715;' : '&#9776;';
  document.getElementById('hamburger').setAttribute('aria-expanded', isOpen);
});

//footer info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

//initial load
createCards(temples);