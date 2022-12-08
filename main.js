// Init globals
const score = {
  gamesPlayed: 0,
  wins: 0,
};

// Function to pause for ms milliseconds
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Pick a random Pokemon from 1 to 890 (fix pending for getting Arceus sprites)
function randomPokemon() {
  // return Math.floor(Math.random() * 904)+1;
  return Math.floor(Math.random() * 890) + 1;
}

// Update scoreboard
function updateScore() {
  let scoreText = document.querySelector(".choice > p:nth-child(1)");
  scoreText.textContent = "Games Played: " + score.gamesPlayed;
  let winsText = document.querySelector(".choice > p:nth-child(2)");
  winsText.textContent = "Wins: " + score.wins;
}

async function showPokemon() {
  let pokemon = [];
  // Add other possible answers as an array of ID numbers
  //TODO: Filter dupes
  for (let i = 0; i < 3; i++) {
    pokemon.push(randomPokemon());
  }
  // Add correct Pokemon to start of array
  pokemon.unshift(randomPokemon());
  let correctPokemon = pokemon[0];

  // Fetch sprites for correct Pokemon from API
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + correctPokemon + "/"
  );
  let data = await response.json();
  // Get its HQ sprite url
  let pokemonSprite = data.sprites.other.home.front_default;

  // Shuffle the array so the correct one isn't always shown first
  // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let randomisedPokemon = pokemon
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Show the Pokemon sprite
  let pokemonPic = document.querySelector(".pokemon-pic img:nth-child(2)");
  pokemonPic.src = pokemonSprite;
  pokemonPic.append();

  // Show possible answers
  // Create buttons
  let choiceList = document.querySelector(".choice");
  for (let i in randomisedPokemon) {
    // Assign new variable so button class matches Pokemon number
    let pokemonNumber = randomisedPokemon[i];
    // Add button
    let choices = document.createElement("button");

    // Get name and add as button text with Pokedex as button value
    let pokemonName = pokeData[pokemonNumber].name;
    choiceList.appendChild(choices).textContent = pokemonName;
    choices.value = pokemonNumber;
  }

  // Get clicked button
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      buttonNumber = e.target.value;
      checkButton(buttonNumber);
    });
  });

  // function is async otherwise the delay function won't work
  async function checkButton(clicked) {
    if (clicked == correctPokemon) {
      // change button text and add a new class to the button if you got it right or wrong
      const btn = document.querySelector(`button[value="${clicked}"]`);
      btn.textContent = "Correct!";
      btn.classList.add("winner");
      score.wins++;
    } else {
      const btn = document.querySelector(`button[value="${clicked}"]`);
      btn.textContent = "Nope!";
      btn.classList.add("loser");
    }
    score.gamesPlayed++;
    updateScore();
    await delay(1000);
    deleteButtons();
    showPokemon();
  }

  //TODO: Make placeholder buttons to replace this crap
  function deleteButtons() {
    let choiceList = document.querySelector(".choice");
    for (i in pokemon) {
      let choices = document.querySelector("button");
      choiceList.removeChild(choices);
    }
  }
}

updateScore();
showPokemon();
