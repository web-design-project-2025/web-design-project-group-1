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