const unwantedItems = ["Svart Te", "Islatte", "Islatte Mocha", "Frapino Caramel", "Frapino Mocka", "Apelsinjuice", "Frozen Lemonade", "Lemonad"];

function fetchCoffeeData(url, container) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch coffee data");
            }
        })
        .then(data => {
            container.innerHTML = '';
            data.filter(drink => !unwantedItems.includes(drink.title)).forEach(drink => {
                let drinkElt = document.createElement("div");
                drinkElt.className = 'drink';

                const drinkHeader = document.createElement("h2");
                drinkHeader.innerText = drink.title;
                drinkElt.appendChild(drinkHeader);

                const drinkImage = document.createElement("img");
                drinkImage.src = drink.image;
                drinkImage.alt = drink.title;
                drinkElt.appendChild(drinkImage);

                const drinkDescription = document.createElement("p");
                drinkDescription.innerText = drink.description;
                drinkElt.appendChild(drinkDescription);

                const ingredientsList = document.createElement("ul");
                drink.ingredients.forEach(ingredient => {
                    const ingredientItem = document.createElement("li");
                    ingredientItem.innerText = ingredient;
                    ingredientsList.appendChild(ingredientItem);
                });
                drinkElt.appendChild(ingredientsList);

                container.appendChild(drinkElt);
            });
        })
        .catch(error => {
            console.error("Error fetching data: ", error.message);
        });
}
