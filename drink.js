document.addEventListener("DOMContentLoaded", async () => {
  // Extract the query value and get the id of the selected drink
  const params = new URLSearchParams(window.location.search);
  const drinkId = params.get("id");

  if (!drinkId) {
    document.body.innerHTML =
      "<p>Drink could not be found. Try again later.</p>";
    return;
  }

  // Sends request to API using the drink ID and receives the data, converts into JS object
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );
  const data = await res.json();
  const drink = data.drinks[0];

  // Update the UI with the drink details
  document.getElementById("drinkName").textContent = drink.strDrink;
  document.getElementById("drinkThumb").src = drink.strDrinkThumb;
  document.getElementById("drinkThumb").alt = drink.strDrink;

  const ingredientsList = document.getElementById("ingredientsList");
  // Shows the ingredients for the drink
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = `${measure || ""} ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }

  document.getElementById("instructions").textContent = drink.strInstructions;

  // Add to favorites button logic
  const addToFavoritesButton = document.getElementById("addToFavorites");
  addToFavoritesButton.addEventListener("click", function () {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the drink is already in the favorites
    if (!favorites.some((favDrink) => favDrink.idDrink === drink.idDrink)) {
      favorites.push(drink);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${drink.strDrink} has been added to your favorites!`);
    } else {
      alert(`${drink.strDrink} is already in your favorites.`);
    }
  });
});

//favorites

addToFavoritesButton.addEventListener("click", function () {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((favDrink) => favDrink.idDrink === drink.idDrink)) {
    favorites.push(drink);
    console.log(favorites); // Log to check the favorites array
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${drink.strDrink} has been added to your favorites!`);
  } else {
    alert(`${drink.strDrink} is already in your favorites.`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesGrid = document.querySelector(".favoritesGrid");

  // Clear any existing content in case it's being rendered again
  favoritesGrid.innerHTML = "";

  if (favorites.length === 0) {
    favoritesGrid.innerHTML =
      "<p>No drinks yet. Add some to your favorites!</p>";
  } else {
    favorites.forEach((favDrink) => {
      const drinkDiv = document.createElement("div");
      drinkDiv.classList.add("favoriteDrink");
      drinkDiv.innerHTML = `
        <img src="${favDrink.strDrinkThumb}" alt="${favDrink.strDrink}">
        <p>${favDrink.strDrink}</p>
      `;
      favoritesGrid.appendChild(drinkDiv);
    });
  }
});
