// Tutorial used for understanding API implementation https://www.youtube.com/watch?v=ziG9NCiE39Y

// Create an array for sorting into categories based in ingredients

let alcoholCategories = [
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Whiskey",
  "Brandy",
  "Cognac",
  "Mezcal",
  "Absinthe",
  "Beer",
  "Wine",
  "Non-Alcoholic",
];
const randomDrinks = [];

async function getDrinkByIngredient(ingredient) {
  // Guard clause warning if array is empty
  if (!ingredient) {
    console.warn("Missing ingredient, can't fetch drinks");
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
    let drinks = [];
    //Non-Alcoholic drinks uses different API endpoint, this solves this and displays it as another category
    if (category === "Non-Alcoholic") {
      const endpoint =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          drinks = Array.isArray(data.drinks) ? data.drinks : [];
        } else {
          console.error(`Error fetching Non-Alcoholic drinks: ${res.status}`);
        }
      } catch (err) {
        console.error("Error fetching Non-Alcoholic drinks:", err);
      }
    } else {
      drinks = await getDrinkByIngredient(category);
    }

    // Divder line between categories
    const categoryDivider = document.createElement("div");
    categoryDivider.classList.add("categoryDivider");
    categoryDivider.style.gridColumn = "2 / 6";

    container.appendChild(categoryDivider);

    const categoryHeader = document.createElement("h2");
    categoryHeader.classList.add("categoryTitle");
    categoryHeader.textContent = category;
    categoryHeader.style.gridColumn = "2 / 6";

    container.appendChild(categoryHeader);

    const drinkGrid = document.createElement("div");
    drinkGrid.classList.add("drinkGrid");
    drinkGrid.setAttribute("data-category", category);

    container.appendChild(drinkGrid);

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.classList.add("loadMoreBtn");
    loadMoreBtn.textContent = "Show More";
    loadMoreBtn.style.gridColumn = "2/6";
    loadMoreBtn.setAttribute("data-category", category);

    let showingAllDrinks = false;

    function renderDrinks() {
      drinkGrid.innerHTML = "";
      const drinksToShow = showingAllDrinks ? drinks : drinks.slice(0, 5);

      drinksToShow.forEach((drink) => {
        const drinkCard = document.createElement("div");
        drinkCard.classList.add("drinkCard");
        drinkCard.innerHTML =
          '<img src="' +
          drink.strDrinkThumb +
          '"alt="' +
          drink.strDrink +
          '"/>' +
          `<p>${drink.strDrink} </p>`;

        drinkCard.addEventListener("click", () => {
          window.location.href = `drink.html?id=${drink.idDrink}`;
        });

        drinkGrid.appendChild(drinkCard);
      });

      loadMoreBtn.style.display = drinks.length > 5 ? "block" : "none";
      loadMoreBtn.textContent = showingAllDrinks ? "Show Less" : "Show More";
    }

    loadMoreBtn.addEventListener("click", () => {
      showingAllDrinks = !showingAllDrinks;
      renderDrinks();
    });

    renderDrinks();
    container.appendChild(loadMoreBtn);
  }
}

//fetch random drink
async function getRandomDrinks(count = 5) {
  // Builds API request with encodeURIComponent to protect from special characters or spaces
  const endpoint = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  const drinks = [];

  // Error handling (network issue, invalid response etc.)
  for (let i = 0; i < count; i++) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        console.error(`Failed to fetch random drink: ${res.status}`);
        continue;
      }

      // Pulls only the drinks property from the returned object from the API
      const { drinks: fetchedDrinks } = await res.json();
      if (Array.isArray(fetchedDrinks) && fetchedDrinks.length > 0) {
        drinks.push(fetchedDrinks[0]);
      }
    } catch (err) {
      console.error(`Unexpected error fetching drinks for "${drink}":`, err);
      return [];
    }
  }

  return drinks;
}

async function displayRandomDrinks() {
  const container = document.querySelector(".randomDrinks");

  const drinks = await getRandomDrinks();

  const sectionHeader = document.createElement("h2");
  sectionHeader.textContent = "Discover Random Recipes";
  sectionHeader.classList.add("randomDrinkTitle");
  sectionHeader.style.gridColumn = "2 / 6";

  container.appendChild(sectionHeader);

  const drinkGrid = document.createElement("div");
  drinkGrid.classList.add("drinkGrid");

  drinks.forEach((drink) => {
    const drinkCard = document.createElement("div");
    drinkCard.classList.add("drinkCard");
    drinkCard.innerHTML =
      '<img src="' +
      drink.strDrinkThumb +
      '"alt="' +
      drink.strDrink +
      '"/>' +
      `<p>${drink.strDrink} </p>`;

    drinkGrid.appendChild(drinkCard);
  });

  container.appendChild(drinkGrid);
}

displayCategories();
displayRandomDrinks();

//submission of form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const thankYouModal = document.getElementById("thankYouModal");

  if (form && thankYouModal) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      thankYouModal.classList.add("show");
      form.reset();
    });

    // Make closeModal available globally only if modal exists
    window.closeModal = function () {
      thankYouModal.classList.remove("show");
    };
  }
});

//glitch animation for the message submission
const glitchElement = document.querySelector(".glitch");

if (glitchElement) {
  setInterval(() => {
    glitchElement.style.animationPlayState = "running";

    setTimeout(() => {
      glitchElement.style.animationPlayState = "paused";
    }, 500);
  }, 3000);
}
