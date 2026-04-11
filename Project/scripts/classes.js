// === Data ===

const classes = [
  {
    name: "Warrior",
    icon: "⚔️",
    description: "The Warrior is a master of physical combat, charging into battle with raw strength and iron will. They stand at the front line, absorbing punishment so their allies can survive.",
    traits: ["Strength", "Endurance", "Courage"]
  },
  {
    name: "Mage",
    icon: "🔮",
    description: "The Mage commands the arcane arts, bending the laws of reality through years of study and discipline. Fragile in body but devastating in power, a Mage can end a battle before it begins.",
    traits: ["Intelligence", "Wisdom", "Precision"]
  },
  {
    name: "Rogue",
    icon: "🗡️",
    description: "The Rogue thrives in the shadows, using speed and cunning over brute force. Masters of stealth and deception, they strike where it hurts most and vanish before enemies can react.",
    traits: ["Agility", "Stealth", "Cunning"]
  },
  {
    name: "Paladin",
    icon: "🛡️",
    description: "The Paladin is a holy warrior driven by faith and a deep sense of justice. Combining martial prowess with divine magic, they protect the innocent and smite the wicked.",
    traits: ["Honor", "Loyalty", "Faith"]
  },
  {
    name: "Ranger",
    icon: "🏹",
    description: "The Ranger is at home in the wilderness, tracking enemies through forests and mountains. A skilled archer and survivalist, they prefer distance and precision over close combat.",
    traits: ["Perception", "Survival", "Patience"]
  },
  {
    name: "Necromancer",
    icon: "💀",
    description: "The Necromancer walks the line between life and death, commanding undead armies and draining the life force of enemies. Dark, calculated, and feared by all.",
    traits: ["Dark Magic", "Control", "Intelligence"]
  }
];

const classResults = {
  warrior:  { name: "Warrior",  icon: "⚔️", desc: "You are bold, fearless, and built for the front line. When others hesitate, you charge forward. Your courage inspires your allies and terrifies your enemies." },
  mage:     { name: "Mage",     icon: "🔮", desc: "You are wise, curious, and always seeking deeper knowledge. You solve problems with intellect and strategy, and your power comes from years of study." },
  rogue:    { name: "Rogue",    icon: "🗡️", desc: "You are clever, resourceful, and always two steps ahead. You prefer working smart over working hard, and you never fight fair when you don't have to." },
  paladin:  { name: "Paladin",  icon: "🛡️", desc: "You are loyal, honorable, and driven by a deep moral compass. You fight not for glory, but to protect those who cannot protect themselves." }
};

const STORAGE_KEY = "rpgrealm_quiz_result";

// === Render Classes ===

function renderClasses() {
  const grid = document.getElementById("classes-grid");
  if (!grid) return;

  grid.innerHTML = classes.map(cls => `
    <div class="class-card-full">
      <div class="class-icon">${cls.icon}</div>
      <h3>${cls.name}</h3>
      <p class="class-desc">${cls.description}</p>
      <div class="class-traits">
        ${cls.traits.map(t => `<span class="trait">${t}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

// === Quiz Logic ===

function getQuizAnswers() {
  const answers = ["q1", "q2", "q3", "q4"].map(name => {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
  });
  return answers;
}

function calculateResult(answers) {
  const counts = { warrior: 0, mage: 0, rogue: 0, paladin: 0 };
  answers.forEach(answer => {
    if (answer && counts[answer] !== undefined) {
      counts[answer]++;
    }
  });
  return Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
}

function showResult(key) {
  const result = classResults[key];
  if (!result) return;

  document.getElementById("result-icon").textContent = result.icon;
  document.getElementById("result-title").textContent = `You are a ${result.name}!`;
  document.getElementById("result-desc").textContent = result.desc;

  document.getElementById("quiz-form").classList.add("hidden");
  document.getElementById("quiz-result").classList.remove("hidden");
  document.getElementById("saved-result").classList.add("hidden");
}

function saveResult(key) {
  const result = classResults[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, name: result.name, icon: result.icon }));
}

function loadSavedResult() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const data = JSON.parse(saved);
  const banner = document.getElementById("saved-result");
  const nameEl = document.getElementById("saved-class-name");
  const iconEl = document.getElementById("saved-class-icon");

  if (banner && nameEl && iconEl) {
    nameEl.textContent = data.name;
    iconEl.textContent = data.icon;
    banner.classList.remove("hidden");
  }
}

function resetQuiz() {
  document.querySelectorAll("input[type='radio']").forEach(r => r.checked = false);
  document.getElementById("quiz-form").classList.remove("hidden");
  document.getElementById("quiz-result").classList.add("hidden");
  document.getElementById("quiz-error").classList.add("hidden");
  document.getElementById("saved-result").classList.add("hidden");
  localStorage.removeItem(STORAGE_KEY);
}

// === Event Listeners ===

function initQuiz() {
  const form = document.getElementById("quiz-form");
  const errorMsg = document.getElementById("quiz-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = getQuizAnswers();

    if (answers.includes(null)) {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");
    const winner = calculateResult(answers);
    saveResult(winner);
    showResult(winner);
  });

  document.getElementById("retake-btn").addEventListener("click", resetQuiz);
  document.getElementById("retake-btn-2").addEventListener("click", resetQuiz);
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

// === Footer Year ===

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// === Init ===

document.addEventListener("DOMContentLoaded", () => {
  renderClasses();
  loadSavedResult();
  initQuiz();
  initHamburger();
  setFooterYear();
});