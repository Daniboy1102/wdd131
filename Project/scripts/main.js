
//Data
const featuredGames = [
  {
    title: "Hogwarts Legacy",
    genre: "Action RPG",
    platform: "Multi-platform",
    description: "Explore a 19th-century open-world Hogwarts and master the magical arts.",
    image: "images/hogwarts-legacy.jpg"
  },
  {
    title: "Elden Ring",
    genre: "Action RPG",
    platform: "Multi-platform",
    description: "A vast, brutal open world forged by FromSoftware and George R.R. Martin.",
    image: "images/elden-ring.jpg"
  },
  {
    title: "Pokémon Scarlet",
    genre: "RPG",
    platform: "Nintendo Switch",
    description: "Explore the open world of Paldea, catch Pokémon, and become a champion.",
    image: "images/pokemon-scarlet.jpeg"
  },
  {
    title: "Dragon Age: Veilguard",
    genre: "Action RPG",
    platform: "Multi-platform",
    description: "Lead a team of heroes to stop ancient gods from tearing the world apart.",
    image: "images/dragon-age.jpg"
  }
];

const classesPreview = [
  { icon: "⚔️", name: "Warrior",  desc: "Frontline fighter with heavy armor and raw power." },
  { icon: "🔮", name: "Mage",     desc: "Master of arcane spells and elemental forces." },
  { icon: "🗡️", name: "Rogue",    desc: "Swift and stealthy, striking from the shadows." },
  { icon: "🛡️", name: "Paladin",  desc: "Holy warrior blending combat and divine magic." }
];

//Functions

function renderFeaturedGames() {
  const container = document.getElementById("featured-games");
  if (!container) return;

  container.innerHTML = featuredGames.map(game => `
    <div class="game-card">
      <img src="${game.image}" alt="${game.title}" loading="lazy" width="400" height="150" />
      <div class="game-card-body">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <span class="game-tag">${game.genre}</span>
      </div>
    </div>
  `).join("");
}

function renderClassesPreview() {
  const container = document.getElementById("classes-preview");
  if (!container) return;

  container.innerHTML = classesPreview.map(cls => `
    <div class="class-card">
      <div class="class-icon">${cls.icon}</div>
      <h3>${cls.name}</h3>
      <p>${cls.desc}</p>
    </div>
  `).join("");
}

//Nav

function initHamburger() {
  const btn = document.getElementById("hamburger");
  const links = document.getElementById("nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

//Year

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

//Init

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedGames();
  renderClassesPreview();
  initHamburger();
  setFooterYear();
});