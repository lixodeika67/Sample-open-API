// remove items that do not consider hot drinks from API link
const unwantedItems = ["Svart Te", "Islatte", "Islatte Mocha", "Frapino Caramel", "Frapino Mocka", "Apelsinjuice", "Frozen Lemonade", "Lemonad"];

async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Failed to fetch data");
    }

}// process and filter the fetched data 
function processCoffeeData(data) {
    return data.filter(drink => !unwantedItems.includes(drink.title));
}
// creating every drink element
function createDrinkElement(drink) {
    const drinkElt = document.createElement("div");
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

    return drinkElt;
}

function renderCoffeeData(data, container) {
    container.innerHTML = '';
    data.forEach(drink => {
        const drinkElt = createDrinkElement(drink);
        container.appendChild(drinkElt);
    });
}

function fetchAndDisplayCoffeeData(url, container) {
    fetchData(url)
        .then(data => processCoffeeData(data))
        .then(filteredData => renderCoffeeData(filteredData, container))
        .catch(error => {
            console.error("Error fetching data: ", error.message);
        });
}