const userFavoriteDrinks = {
  paulina: "Espresso martini",
  henke: "White Russian",
  ludvig: "barracuda",
};

function openModal(modalId, user) {
  const modal = document.getElementById(modalId);
  const modalText = modal.querySelector(".modalText");
  const drinkDetails = modalText.querySelector(".drinkDetails");
  const modalImage = modal.querySelector(".modalImage");

  // Reset previous content
  drinkDetails.textContent = "Loading favorite drink...";
  modalImage.innerHTML = "";

  // Remove old button if exists
  const oldButton = modalText.querySelector(".drinkLinkButton");
  if (oldButton) oldButton.remove();

  modal.classList.add("show");

  const drinkName = userFavoriteDrinks[user];
  if (!drinkName) {
    drinkDetails.textContent = "No favorite drink found.";
    return;
  }

  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      drinkName
    )}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      if (!data.drinks || data.drinks.length === 0) {
        drinkDetails.textContent = "Drink not found.";
        return;
      }

      const drink = data.drinks[0];

      // Show drink name and instructions
      drinkDetails.innerHTML = `
        <p><strong>${drink.strDrink}</strong></p>
        <p>${drink.strInstructions}</p>
      `;

      // Add drink image
      if (drink.strDrinkThumb) {
        const img = document.createElement("img");
        img.src = drink.strDrinkThumb;
        img.alt = drink.strDrink;
        img.className = "favoriteDrinkImage";
        modalImage.appendChild(img);
      }

      // Create the button linking to the cocktail page
      // Create the button linking to your website's drink details page
      const button = document.createElement("button");
      button.textContent = "View Full Recipe";
      button.className = "drinkLinkButton";
      button.onclick = () => {
        window.open(`drink.html?id=${drink.idDrink}`, "_blank"); // Opens in new tab
      };

      // Append button to the modal text container
      modalText.appendChild(button);
    })
    .catch(() => {
      drinkDetails.textContent = "Failed to load drink info.";
    });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("show");
}
