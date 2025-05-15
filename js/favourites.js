//Function gets current favorite drink IDs from localStorage
export function getFavorites () {
    try {
        const storedFavorites = localStorage.getItem('favoriteDrinks');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Couldn't read favorites from storage:", error);
        return []; //Return empty array if an error occurs
    }
}

//Function saves a drink ID to favorites if return true, successfully added. 
// False, already exists in favorites
export function addToFavorites (drinkId) { 
    const currentFavorites = getFavorites ();
    //Avoids any duplicate drink IDs
    if (currentFavorites.includes(drinkId)) {
        return false;
    }

    //Add new favorite and save
    const updatedFavorites = [... currentFavorites, drinkId];
    localStorage.setItem('favoriteDrinks', JSON.stringify(updatedFavorites));
    return true;
}

//Function removes a drink ID from favorites
export function removeFromFavorites (drinkId) {
    const currentFavorites = getFavorites();
    const newFavorites = currentFavorites.filter(id => id !== drinkId);

    //Updates with new drink ID if something changed
    if (newFavorites.length !== currentFavorites.length) {
        localStorage.setItem ('favoriteDrinks', JSON.stringify(newFavorites));
        return true;
    }
    return false;
}

//Function checks if a drink is favorited
export function isFavorited (drinkId) {
    return getFavorites().includes(drinkId);
}