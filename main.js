//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// Input
let button = document.querySelector("button");
let last = document.querySelector("#prev");
let next = document.querySelector("#next");

// Output
let title = document.querySelector("h2");
let instructions = document.querySelector(".instructions");
let image = document.querySelector("img");
let i = 0;

// Events on click
button.addEventListener("click", getCocktail);
last.addEventListener("click", goBack);
next.addEventListener("click", goNext);

// Keyup events
document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") {
    goBack();
  } else if (e.key === "ArrowRight") {
    goNext();
  } else if (e.key === "Enter") {
    getCocktail();
  }

  //   console.log(e);
});

// Functions
function getCocktail() {
  let userInput = document.querySelector("input").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const drinkEl = data.drinks[i];

      //   console.log(data.drinks[i]);
      title.innerText = drinkEl.strDrink;
      image.src = drinkEl.strDrinkThumb;
      instructions.innerText = drinkEl.strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function goBack() {
  i--;
  getCocktail();
}
function goNext() {
  i++;
  getCocktail();
}
