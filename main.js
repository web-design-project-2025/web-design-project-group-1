// Tutorial used for understanding API implementation https://www.youtube.com/watch?v=ziG9NCiE39Y

// Create an array for sorting into categories based in ingredients
const alcoholCategories = ['Vodka', 'Rum', 'Tequila'];

async function getDrinkByIngredient (ingredient) {
    if(!ingredient) {
        console.warn('No ingredient provided to getDrinkByIngredient');
        return [];
    }

    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
    const query = `?i=${encodeURIComponent(ingredient)}`;


    // Error handling (network issue, invalid response etc.)
    try {
        const res = await fetch(endpoint + query);
        if(!res.ok) {
            console.error(`Failed to fetch drinks: ${res.status}`);
            return [];
        }
        const { drinks } = await res.json();
        return Array.isArray(drinks) ? drinks : [];
    } catch (err) {
        console.error(`Unexpected error fetching drinks for "${ingredient}":`, err);
        return [];
    }
}

//Test the getDrinkByIngredient async function
async function testGetDrinkByIngredient() {
    const vodkaDrinks = await getDrinkByIngredient('Vodka');
    console.log('Vodka drinks:', vodkaDrinks);
}

testGetDrinkByIngredient();