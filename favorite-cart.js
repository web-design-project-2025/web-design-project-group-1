document
  .getElementById("favoritesToggle")
  .addEventListener("click", function () {
    const panel = document.getElementById("favoritesPanel");
    panel.classList.toggle("open");
  });

document
  .getElementById("closeFavorites")
  .addEventListener("click", function () {
    const panel = document.getElementById("favoritesPanel");
    panel.classList.remove("open");
  });

// Example: Adding items to the favorites list
const favoritesList = document.getElementById("favoritesList");
const emptyMessage = favoritesList.querySelector(".empty-message");

// Simulating adding a favorite item (you would use real data here)
let favorites = []; // Replace with your actual favorites data

// Example function to update the favorites list
function updateFavorites() {
  if (favorites.length > 0) {
    emptyMessage.style.display = "none"; // Hide empty state message
    favoritesList.innerHTML = ""; // Clear the current content

    favorites.forEach((drink) => {
      const favoriteItem = document.createElement("div");
      favoriteItem.classList.add("favorite-item");
      favoriteItem.textContent = drink; // Add drink name or info here
      favoritesList.appendChild(favoriteItem);
    });
  } else {
    emptyMessage.style.display = "block"; // Show empty state message
  }
}

// Call this function to update the favorites list
updateFavorites();
