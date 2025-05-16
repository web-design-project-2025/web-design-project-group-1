//Function gets current favorite drink IDs from localStorage
export function getFavourites () {
    try {
        const storedFavourites = localStorage.getItem('favouriteDrinks');
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    } catch (error) {
        console.error("Couldn't read favourites from storage:", error);
        return []; //Return empty array if an error occurs
    }
}

//Function saves a drink ID to favourites if return true, successfully added. 
// False, already exists in favourites
export function addToFavourites (drinkId) { 
    const currentFavourites = getFavourites ();
    //Avoids any duplicate drink IDs
    if (currentFavourites.includes(drinkId)) {
        return false;
    }

    //Add new favorite and save
    const updatedFavourites = [... currentFavourites, drinkId];
    localStorage.setItem('favouriteDrinks', JSON.stringify(updatedFavourites));
    return true;
}

//Function removes a drink ID from favourites
export function removeFromFavourites (drinkId) {
    const currentFavourites = getFavourites();
    const newFavourites = currentFavourites.filter(id => id !== drinkId);

    //Updates with new drink ID if something changed
    if (newFavourites.length !== currentFavourites.length) {
        localStorage.setItem ('favouriteDrinks', JSON.stringify(newFavourites));
        return true;
    }
    return false;
}

//Function checks if a drink is favourited
export function isFavourited (drinkId) {
    return getFavourites().includes(drinkId);
}

//Function checks if the current page is favourites.html
// If it is, it loads the favourites from localStorage and displays them
if (window.location.pathname.includes('favorites.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const favourites = getFavourites();
        const grid = document.querySelector('.favouriteGrid');
        const emptyMsg = document.querySelector('.emptyFavouriteMessage');

        //Show message if user has no favourites
        if (favourites.length === 0) {
            emptyMsg.style.display = 'block';
            return;
        }
        
        emptyMsg.style.display = 'none';

        //Fetches drink details for each favourite drink ID
        //and creates a card for each drink
        for (const id of favourites) {
            const drink = await fetchDrinkDetails(id);
            if (drink) {
                grid.appendChild(createDrinkCard(drink));
            }
        }
    });
}

//Function fetches drink details from API using drink ID
async function fetchDrinkDetails(id) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        return data.drinks[0];
    } catch (error) {
        console.error('Error fetching drinks:', error)
        return null;
    }
}

//Display drink card with image, name and remove button for each favourite drink
function createDrinkCard (drink) {
    const card = document.createElement('div');
    card.className = 'drinkCard';
    card.innerHTML = `<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <p>${drink.strDrink}</p>
        <button class="removeFavourite" data-id="${drink.idDrink}">✕</button>`;
    
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeFavourite')) {
            const idToRemove = e.target.dataset.id;
            removeFromFavourites(idToRemove);
            card.remove();

            if (getFavourites().length === 0) {
                document.querySelector('.emptyFavouriteMessage').style.display = 'block';
            }
        } else {
            window.location.href = `drink.html?id=${drink.idDrink}`;
        }
    });
    return card;
}