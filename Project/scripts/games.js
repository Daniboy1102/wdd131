
// === Games Data ===
const games = [
  {
    title: "Hogwarts Legacy",
    genre: "Action RPG",
    difficulty: "Medium",
    platform: "PC, PS5, Xbox Series X, Switch",
    description: "Set in the 1800s wizarding world, explore Hogwarts castle and its vast surrounding lands while mastering spells and uncovering ancient secrets.",
    image: "images/hogwarts-legacy.jpg"
  },
  {
    title: "Elden Ring",
    genre: "Action RPG",
    difficulty: "Hard",
    platform: "PC, PS5, Xbox Series X",
    description: "A punishing open-world action RPG developed by FromSoftware with world-building by George R.R. Martin. Every corner hides danger and wonder.",
    image: "images/elden-ring.jpg"
  },
  {
    title: "Pokémon Scarlet",
    genre: "RPG",
    difficulty: "Easy",
    platform: "Nintendo Switch",
    description: "Explore the open world of Paldea, battle gym leaders, and catch hundreds of Pokémon in this modern entry in the beloved franchise.",
    image: "images/pokemon-scarlet.jpeg"
  },
  {
    title: "Dragon Age: Veilguard",
    genre: "Action RPG",
    difficulty: "Medium",
    platform: "PC, PS5, Xbox Series X",
    description: "Lead the Veilguard, a team of unlikely heroes, on a mission to stop ancient elven gods from unleashing chaos upon the world of Thedas.",
    image: "images/dragon-age.jpg"
  },
  {
    title: "The Witcher 3",
    genre: "Open World",
    difficulty: "Medium",
    platform: "PC, PS5, Xbox Series X, Switch",
    description: "Play as Geralt of Rivia, a monster hunter for hire, in one of the most acclaimed open-world RPGs ever made. Rich story, deep choices.",
    image: "images/witcher-3.jpg"
  },
  {
    title: "Final Fantasy XVI",
    genre: "Action RPG",
    difficulty: "Medium",
    platform: "PC, PS5",
    description: "A darker, action-driven Final Fantasy set in the world of Valisthea where massive Eikons clash and political intrigue runs deep.",
    image: "images/final-fantasy-16.jpeg"
  },
  {
    title: "Baldur's Gate 3",
    genre: "RPG",
    difficulty: "Hard",
    platform: "PC, PS5, Xbox Series X",
    description: "A deeply immersive turn-based RPG based on Dungeons & Dragons. Every choice matters in this epic adventure through the Forgotten Realms.",
    image: "images/baldurs-gate-3.jpg"
  },
  {
    title: "Zelda: Tears of the Kingdom",
    genre: "Open World",
    difficulty: "Easy",
    platform: "Nintendo Switch",
    description: "Explore the skies, surface, and depths of Hyrule with extraordinary new abilities in this massive open-world adventure.",
    image: "images/zelda.jpg"
  }
];

// === State ===

let activeGenre = "all";
let activeDifficulty = "all";

// === Render ===

function renderGames(list) {
  const grid = document.getElementById("games-grid");
  const noResults = document.getElementById("no-results");
  const count = document.getElementById("results-count");

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    grid.innerHTML = list.map(game => `
      <div class="game-card-full">
        <img src="${game.image}" alt="${game.title}" loading="lazy" width="400" height="160" />
        <div class="card-body">
          <h3>${game.title}</h3>
          <div class="card-meta">
            <span class="tag tag-genre">${game.genre}</span>
            <span class="tag tag-${game.difficulty.toLowerCase()}">${game.difficulty}</span>
          </div>
          <p>${game.description}</p>
          <p class="card-platform">🎮 ${game.platform}</p>
        </div>
      </div>
    `).join("");
  }

  count.textContent = `Showing ${list.length} of ${games.length} games`;
}

// === Filter Logic ===

function getFilteredGames() {
  return games.filter(game => {
    const genreMatch = activeGenre === "all" || game.genre === activeGenre;
    const difficultyMatch = activeDifficulty === "all" || game.difficulty === activeDifficulty;
    return genreMatch && difficultyMatch;
  });
}

function applyFilters() {
  const filtered = getFilteredGames();
  renderGames(filtered);
}

// === Event Listeners ===

function initFilters() {
  const genreSelect = document.getElementById("filter-genre");
  const difficultySelect = document.getElementById("filter-difficulty");
  const resetBtn = document.getElementById("reset-filters");

  genreSelect.addEventListener("change", () => {
    activeGenre = genreSelect.value;
    applyFilters();
  });

  difficultySelect.addEventListener("change", () => {
    activeDifficulty = difficultySelect.value;
    applyFilters();
  });

  resetBtn.addEventListener("click", () => {
    activeGenre = "all";
    activeDifficulty = "all";
    genreSelect.value = "all";
    difficultySelect.value = "all";
    applyFilters();
  });
}

// === Hamburger Nav ===

function initHamburger() {
  const btn = document.getElementById("hamburger");
  const links = document.getElementById("nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// === Year ===

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// === Init ===

document.addEventListener("DOMContentLoaded", () => {
  renderGames(games);
  initFilters();
  initHamburger();
  setFooterYear();
});