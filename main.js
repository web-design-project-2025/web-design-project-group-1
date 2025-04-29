// Tutorial used for understanding API implementation https://www.youtube.com/watch?v=ziG9NCiE39Y

// Create an array for sorting into categories based in ingredients
const alcoholCategories = ['Vodka', 'Rum', 'Tequila'];

async function getDrinkByIngredient (ingredient) {
    // Guard clause warning if array is empty
    if(!ingredient) {
        console.warn('No ingredient provided to getDrinkByIngredient');
        return [];
    }

    // Builds API request with encodeURIComponent to protect from special characters or spaces
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    const query = `?i=${encodeURIComponent(ingredient)}`;


    // Error handling (network issue, invalid response etc.)
    try {
        const res = await fetch(endpoint + query);
        if(!res.ok) {
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

//Test the getDrinkByIngredient async function by logging categories in console
async function testGetDrinkByIngredient() {
    const vodkaDrinks = await getDrinkByIngredient('Vodka');
    const rumDrinks = await getDrinkByIngredient('Rum');
    const tequilaDrinks = await getDrinkByIngredient('Tequila');

    console.log('Vodka drinks:', vodkaDrinks);
    console.log('Rum Drinks:', rumDrinks);
    console.log('Tequila Drinks', tequilaDrinks);
}

testGetDrinkByIngredient();