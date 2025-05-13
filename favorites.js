document.addEventListener("DOMContentLoaded", function () {
  const favoritesGrid = document.querySelector(".favoritesGrid");
  const emptyMessage = document.querySelector(".emptyFavoritesMessage");

  // Retrieve favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  console.log("Loaded favorites from localStorage:", favorites); // For debugging

  // If there are favorites, display them
  if (favorites.length > 0) {
    emptyMessage.style.display = "none"; // Hide the empty message

    // Clear previous favorites display before appending new ones
    favoritesGrid.innerHTML = "";

    favorites.forEach((drink) => {
      const drinkCard = document.createElement("div");
      drinkCard.classList.add("drink-card");
      drinkCard.innerHTML = `
        <h3>${drink.strDrink}</h3>
        <img src="${drink.strDrinkThumb}" alt="${
        drink.strDrink
      }" class="drink-image">
        <p>Ingredients: ${Object.values(drink)
          .filter((_, index) => index >= 17 && index <= 31)
          .join(", ")}</p>
        <a href="product-details.html?id=${drink.idDrink}">View Details</a>
      `;
      favoritesGrid.appendChild(drinkCard);
    });
  } else {
    emptyMessage.style.display = "block"; // Show the empty message
  }
});
