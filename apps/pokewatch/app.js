// Pokémon Game for Bangle.js 2 (App-ready)

let pokemonList = ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Eevee"];
let events = ["Found a berry!", "Tripped over a rock!", "Met a trainer!"];
let collection = [];

let currentEncounter = null;
let encounterActive = false;
let encounterTimer;

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function centerText(txt, y, size=2) {
  g.setFont("6x8", size);
  let w = g.stringWidth(txt);
  g.drawString(txt, (g.getWidth() - w) / 2, y);
}

function startEncounter() {
  encounterActive = true;
  if (Math.random() < 0.5) {
    currentEncounter = { type: "pokemon", name: randomChoice(pokemonList) };
  } else {
    currentEncounter = { type: "event", name: randomChoice(events) };
  }
  drawEncounter();
}

function drawEncounter() {
  g.clear();
  centerText("Encounter!", 20, 2);
  centerText(currentEncounter.name, 60, 3);
  g.setFont("6x8", 2);
  centerText("Swipe Right = Yes", 120, 2);
  centerText("Swipe Left = No", 145, 2);
}

function drawCollection() {
  g.clear();
  centerText("Your Pokémon", 20, 2);
  g.setFont("6x8", 2);
  let y = 50;
  if (collection.length === 0) {
    centerText("None yet!", 80, 2);
  } else {
    collection.forEach(p => {
      centerText(p, y, 2);
      y += 25;
    });
  }
}

function handleSwipe(dir) {
  if (!encounterActive) {
    if (dir > 0) drawCollection(); // right swipe = collection
    return;
  }

  g.clear();
  if (dir > 0) { // accept
    if (currentEncounter.type === "pokemon") {
      collection.push(currentEncounter.name);
      centerText("Caught!", 70, 3);
      centerText(currentEncounter.name, 100, 2);
    } else {
      centerText("Event Happened!", 80, 2);
    }
  } else { // reject
    centerText("Ignored...", 90, 2);
  }
  encounterActive = false;
}

function loop() {
  if (!encounterActive && Math.random() < 0.5) {
    startEncounter();
  }
}

// ---- App entry point ----
function show() {
  // Draw widgets
  Bangle.loadWidgets();
  Bangle.drawWidgets();
  
  // Attach swipe handler
  Bangle.on('swipe', handleSwipe);
  
  // Start 10-min timer
  encounterTimer = setInterval(loop, 10 * 60 * 1000);
  
  // start immediately
  loop();
}

// Clean up when exiting
function hide() {
  Bangle.removeListener('swipe', handleSwipe);
  if (encounterTimer) clearInterval(encounterTimer);
}

// Export app interface
exports = {
  show: show,
  hide: hide
};
