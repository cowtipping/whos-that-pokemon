// Init globals
const score = {
  gamesPlayed: 0,
  wins: 0,
};

// Function to pause for ms milliseconds
function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Update scoreboard
function updateScore() {
  let scoreText = document.querySelector(".score-container > .played");
  if (scoreText !== null) {
    scoreText.textContent = "Games Played: " + score.gamesPlayed;
  }
  let winsText = document.querySelector(".score-container > .wins");
  if (winsText !== null) {
    winsText.textContent = "Wins: " + score.wins;
  }
}

async function showPokemon() {
  // Add possible answers as an array of ID numbers
  // While pokemon array doesn't include the value and the length of the array is < 4, add pokemon to it
  // Pick a random Pokemon from 1 to 890 (fix pending for getting Arceus sprites)
  // old value - (Math.random() * 904)+1;
  let pokemon: number[] = [];
  while (pokemon.length < 4) {
    var randomPokemon = Math.floor(Math.random() * 890) + 1;
    if (!pokemon.includes(randomPokemon)) {
      pokemon.push(randomPokemon);
    }
  }

  // Make the the correct Pokemon be the one at index 0
  let correctPokemon = pokemon[0];

  // Fetch sprites for correct Pokemon from API
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + correctPokemon + "/"
  );
  let apiData = await response.json();
  // Get its HQ sprite url
  let pokemonSprite = apiData.sprites.other.home.front_default;

  // Shuffle the array so the correct one isn't always shown first
  // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let randomisedPokemon = pokemon
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Show the Pokemon sprite
  let pokemonPic = document.querySelector(
    ".pokemon-pic-container img:nth-child(2)"
  ) as HTMLImageElement;
  if (pokemonPic !== null) {
    pokemonPic.src = pokemonSprite;
    pokemonPic.append();
  }

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
    if (choiceList !== null) {
      choiceList.appendChild(choices).textContent = pokemonName;
    }
    if (choices !== null) {
      choices.value = pokemonNumber.toString();
    }
  }

  // Get clicked button
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      let buttonNumber = (e.target as HTMLButtonElement).value;
      checkButton(Number(buttonNumber));
    });
  });

  // function is async otherwise the delay function won't work
  async function checkButton(clicked: number) {
    if (clicked == correctPokemon) {
      // change button text and add a new class to the button if you got it right or wrong
      const btn = document.querySelector(`button[value="${clicked}"]`);
      if (btn !== null) {
        btn.textContent = "Correct!";
        btn.classList.add("winner");
      }
      score.wins++;
    } else {
      const btn = document.querySelector(`button[value="${clicked}"]`);
      if (btn !== null) {
        btn.textContent = "Nope!";
        btn.classList.add("loser");
      }
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
    for (let i in pokemon) {
      let choices = document.querySelector("button")!;
      if (choiceList !== null) {
        choiceList.removeChild(choices);
      }
    }
  }
}

updateScore();
showPokemon();
