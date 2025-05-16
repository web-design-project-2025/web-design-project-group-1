// Tutorial for understanding API implementation in Java:
// https://www.youtube.com/watch?v=ziG9NCiE39Y
//Refrence:
// TheCocktailDB API Documentation:
// https://www.thecocktaildb.com/api.php
// Source of cocktail data and API endpoint details.

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

  //making sure it resets previous content
  drinkDetails.textContent = "Loading favorite drink...";
  modalImage.innerHTML = "";

  modal.classList.add("show");

  //if the drink is not found in the api
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

      //showing drink name and instructions
      drinkDetails.innerHTML = `
        <p><strong>${drink.strDrink}</strong></p>
        <p>${drink.strInstructions}</p>
      `;

      if (drink.strDrinkThumb) {
        const img = document.createElement("img");
        img.src = drink.strDrinkThumb;
        img.alt = drink.strDrink;
        img.className = "favoriteDrinkImage";
        modalImage.appendChild(img);
      }

      const existingButton = modalText.querySelector(".drinkLinkButton");
      if (existingButton) existingButton.remove();

      //button linking to there own drink page
      const button = document.createElement("button");
      button.textContent = "View Full Recipe";
      button.className = "drinkLinkButton";
      button.onclick = () => {
        window.open(`drink.html?id=${drink.idDrink}`, "_blank"); // Opens in new tab
      };

      //append button
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
