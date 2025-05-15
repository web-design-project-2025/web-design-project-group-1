import { addToFavourites, removeFromFavourites, isFavourited } from "./favourites";

document.addEventListener('DOMContentLoaded', async () => {
    // Extracts query value and gets the id of selected drink
    const params = new URLSearchParams (window.location.search);
    const drinkId = params.get ('id');

    if (!drinkId) {
        document.body.innerHTML = '<p>Drink could not be found. Try again later.</p>';
        return; 
    }

    // Sends request to API using the drink ID and recieves the data, converts into JS object
    const data = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(res => res.json())
        .catch(err => console.log('API fetch failed'));

    // Gets first drink from API response
    const drink = data.drinks[0];

    document.getElementById('drinkName').textContent = drink.strDrink;
    document.getElementById('drinkThumb').src = drink.strDrinkThumb;
    document.getElementById('drinkThumb').alt = drink.strDrink;

    const ingredientsList = document.getElementById('ingredientsList');
    // This loop goes through each possible ingredient (up to 15)
    // If ingredient exists, it adds it to the list, along with its measurements if available
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            const li = document.createElement('li');
            // Uses only the ingredients for the specific drink clicked on
            li.textContent = `${measure || ''} ${ingredient}`;
            ingredientsList.appendChild(li);
        }
    }

    document.getElementById('instructions').textContent = drink.strInstructions;

    const favouriteButton = document.createElement('button');
    favouriteButton.id = 'favouriteButton';
    favouriteButton.classList.add('favouriteBtn');

    updateFavouriteButtonText(favouriteButton, drinkId);

    document.getElementById('drinkInfo').prepend(favouriteButton);

    favouriteButton.addEventListener('click', () => {
        toggleFavouriteStatus(drinkId, favouriteButton);
    });
});

function updateFavouriteButtonText(button, drinkId) {
    button.innerHTML = isFavourited(drinkId)
        ? 'Remove from Favourites'
        : 'Add to Favourites';
}

function toggleFavouriteStatus (drinkId, button) {
    if (isFavourited(drinkId)) {
        removeFromFavourites(drinkId);
    } else {
        addToFavourites(drinkId);
    }
    updateFavouriteButtonText(button, drinkId);
}