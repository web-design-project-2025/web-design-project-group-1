// Tutorial used for understanding API implementation https://www.youtube.com/watch?v=ziG9NCiE39Y

// Create an array for sorting into categories based in ingredients

let alcoholCategories = ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Brandy', 'Cognac', 'Mezcal', 'Absinthe', 'Beer', 'Wine', 'Non-Alcoholic'];
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

    if (category === "Non-Alcoholic") {
      const endpoint = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          drinks = Array.isArray(data.drinks) ? data.drinks : [];
        } else {
          console.error (`Error fetching Non-Alcoholic drinks: ${res.status}`);
        }
      } catch (err) {
        console.error ("Error fetching Non-Alcoholic drinks:", err);
      }
    } else {
      drinks = await getDrinkByIngredient(category);
    }

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
      drinkCard.innerHTML = '<img src="' + drink.strDrinkThumb + '"alt="' + drink.strDrink + '"/>' + `<p>${drink.strDrink} </p>`;
            
      drinkCard.addEventListener('click', function() {
        window.location.href = `drink.html?id=${drink.idDrink}`;
      }) 

      drinkGrid.appendChild(drinkCard);
    });
    container.appendChild(drinkGrid);
  }
}




//fetch random drink
async function getRandomDrinks(count = 10) {
    // Builds API request with encodeURIComponent to protect from special characters or spaces
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const drinks = [];

    // Error handling (network issue, invalid response etc.)
    for (let i = 0; i < count; i++) {
        try {
            const res = await fetch(endpoint);
            if(!res.ok) {
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

async function displayRandomDrinks () {
    const container = document.querySelector('.randomDrinks');

    const drinks = await getRandomDrinks();

    const sectionHeader = document.createElement('h2');
    sectionHeader.textContent = 'Discover Random Recipes';
    sectionHeader.classList.add('randomDrinkTitle');
    sectionHeader.style.gridColumn = '2 / 6';

    container.appendChild(sectionHeader);

    const drinkGrid = document.createElement('div');
    drinkGrid.classList.add('drinkGrid');

    drinks.forEach(drink => {
        const drinkCard = document.createElement('div');
        drinkCard.classList.add('drinkCard');
        drinkCard.innerHTML = '<img src="' + drink.strDrinkThumb + '"alt="' + drink.strDrink + '"/>' + `<p>${drink.strDrink} </p>`;
        
        drinkGrid.appendChild(drinkCard);
    });

    container.appendChild(drinkGrid);
}  


displayCategories();
displayRandomDrinks();

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

