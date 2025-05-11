// Tutorial used for understanding API implementation https://www.youtube.com/watch?v=ziG9NCiE39Y

// Create an array for sorting into categories based in ingredients
const alcoholCategories = ["Vodka", "Rum", "Tequila"];

async function getDrinkByIngredient(ingredient) {
  // Guard clause warning if array is empty
  if (!ingredient) {
    console.warn("No ingredient provided to getDrinkByIngredient");
    return [];
  }

  // Builds API request with encodeURIComponent to protect from special characters or spaces
  const endpoint = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
  const query = `?i=${encodeURIComponent(ingredient)}`;

  // Error handling (network issue, invalid response etc.)
  try {
    const res = await fetch(endpoint + query);
    if (!res.ok) {
      console.error(`Failed to fetch drinks: ${res.status}`);
      return [];
    }
    // Pulls only the drinks property from the returned object from the API
    const { drinks } = await res.json();
    return Array.isArray(drinks) ? drinks : [];
  } catch (err) {
    console.error(`Unexpected error fetching drinks for "${ingredient}":`, err);
    return [];
  }
}

// Function for displaying categories and relating drinks on the "categories page"
async function displayCategories() {
  const container = document.querySelector(".drinkCategories");

  for (const category of alcoholCategories) {
    const drinks = await getDrinkByIngredient(category);

    const categoryHeader = document.createElement("h2");
    categoryHeader.classList.add("categoryTitle");
    categoryHeader.textContent = category;
    categoryHeader.style.gridColumn = "2 / 6";

    container.appendChild(categoryHeader);

    const drinkGrid = document.createElement("div");
    drinkGrid.classList.add("drinkGrid");

    drinks.slice(0, 8).forEach((drink) => {
      const drinkCard = document.createElement("div");
      drinkCard.classList.add("drinkCard");
      drinkCard.innerHTML = `<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            <p>${drink.strDrink}</p>`;

      drinkGrid.appendChild(drinkCard);
    });
    container.appendChild(drinkGrid);
  }
}

displayCategories();

//submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("thankYouModal").style.display = "flex";

    document.querySelector(".contactForm form").reset();
  });

function closeModal() {
  document.getElementById("thankYouModal").style.display = "none";
}

//favorite
document.addEventListener("DOMContentLoaded", function () {
  const favoritesToggle = document.getElementById("favoritesToggle");
  const favoritesPanel = document.getElementById("favoritesPanel");
  const closeFavorites = document.getElementById("closeFavorites");

  // Toggle favorite panel visibility
  favoritesToggle.addEventListener("click", () => {
    if (
      favoritesPanel.style.display === "none" ||
      favoritesPanel.style.display === ""
    ) {
      favoritesPanel.style.display = "block";
    } else {
      favoritesPanel.style.display = "none";
    }
  });

  // Close the favorites panel when close button is clicked
  closeFavorites.addEventListener("click", () => {
    favoritesPanel.style.display = "none"; // Hide the panel
  });
});
