// Init globals
const score = {
    gamesPlayed: 0,
    wins: 0
}

// Pick a random Pokemon from 1 to 904
function randomPokemon() {
    return Math.floor(Math.random() * 904) + 1;
}

// Update scoreboard
function updateScore() {
    let scoreText = document.querySelector(".scoreboard > p:nth-child(2)");
    scoreText.textContent = "Games Played: " + score.gamesPlayed;
    let winsText = document.querySelector(".scoreboard > p:nth-child(3)");
    winsText.textContent = "Wins: " + score.wins;
};

// Get Pokemon from API
/*
async function getPokemonAPI() {

    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon[0] + "/");
    let data = await response.json();

    // Get its name and sprite
    let pokemonName = data.name;
    let pokemonSprite = data.sprites.front_default;
    console.log("Name: " + pokemonName);
    console.log("Sprite url: " + pokemonSprite);

    let card1Sprite = document.querySelector("#card1-sprite");
    let imgTag = document.createElement("img");
    imgTag.src = pokemonSprite; // add the src link
    imgTag.alt = pokemonName.toString(); // give it an alt tag
    imgTag.classList.add("sprite"); // add a class of 'sprite'
    card1Sprite.appendChild(imgTag)

}
*/

async function showPokemon() {
    // Start array of Pokemon and assign the correct answer (by ID number)
    let pokemon = [];
    pokemon[0] = randomPokemon();
    let correctPokemon = pokemon[0];

    // Fetch correct Pokemon from API
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + correctPokemon + "/");
    let data = await response.json();

    // Get the winning Pokemon's name
    //let pokemonName = data.name;

    // Get correct Pokemon's sprite url 
    let pokemonSprite = data.sprites.front_default;

    // Add other possible answers as an array of ID numbers
    for (let i = 0; i<3; i++) {
        pokemon.push(randomPokemon());
    }
    console.log("Pokemon numbers: " + pokemon);
    console.log("Correct mon: " + data.name);

    // Shuffle the array
    // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let randomisedPokemon = pokemon
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    ////// Show the Pokemon sprite //////
    let pokemonPic = document.querySelector(".pokemon-pic img");
    pokemonPic.src = pokemonSprite;
    pokemonPic.append();

    ////// Show possible answers //////
    // Create buttons
    let choiceList = document.querySelector(".your-choices");
    for (let i in randomisedPokemon) {
        // Assign new variable so button class matches Pokemon number 
        let pokemonNumber = randomisedPokemon[i];
        // Add button
        let choices = document.createElement("button");
        //choiceList.appendChild(choices).textContent = pokemonNumber;
        // Get data from API
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber + "/");
        let data = await response.json();
        // Get name and add as button text 
        let pokemonName = data.name;
        choiceList.appendChild(choices).textContent = pokemonName;
        // Add ID number as class
        choices.classList.add(pokemonNumber);
    }

    // Get clicked button
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener('click', (e) => {
          buttonNumber = e.target.className;
          checkButton(buttonNumber);
        });
      });

    // If the class text (number) matches the correct Pokemon number - score point
    function checkButton(clicked) {
        if (clicked == correctPokemon) {
            score.wins++;
        } else {
        }
        score.gamesPlayed++;
        updateScore();
        deleteButtons();
        showPokemon();
    }

    function deleteButtons() {
        let choiceList = document.querySelector(".your-choices");
        for (let i in pokemon) {
            let choices = document.querySelector("button");
            choiceList.removeChild(choices);
        }
    }
}

updateScore();
showPokemon();
