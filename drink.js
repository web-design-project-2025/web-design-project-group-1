document.addEventListener('DOMContentLoaded', async () => {
    // Extracts query value and gets the id of selected drink
    const params = new URLSearchParams (window.location.search);
    const drinkId = params.get ('id');

    if (!drinkId) {
        document.body.innerHTML = '<p>Drink could not be found. Try again later.</p>';
        return; 
    }

    // Sends request to API using the drink ID and recieves the data, converts into JS object
    const res = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const data = await res.json();
    // Gets first drink from API response
    const drink = data.drinks[0];

    document.getElementById('drinkName').textContent = drink.strDrink;
    document.getElementById('drinkThumb').src = drink.strDrinkThumb;
    document.getElementById('drinkThumb').alt = drink.strDrink;

    const ingredientsList = document.getElementById('ingredientsList');
    // Shows the ingrediensts for the drink
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
});