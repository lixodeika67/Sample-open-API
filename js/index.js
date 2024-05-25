const unwantedItems = ["Svart Te", "Islatte", "Islatte Mocha", "Frapino Caramel", "Frapino Mocka", "Apelsinjuice", "Frozen Lemonade", "Lemonad"];

async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Failed to fetch data");
    }
}

function processCoffeeData(data) {
    return data.filter(drink => !unwantedItems.includes(drink.title));
}

function createTitleElement(drink, detailsContainer) {
    const titleElt = document.createElement("h2");
    titleElt.innerText = drink.title;
    titleElt.className = 'drink-title';
    titleElt.addEventListener('click', () => {
        
        document.querySelectorAll('.drink-title').forEach(el => el.classList.remove('pressed'));
        titleElt.classList.add('pressed');
        displayCoffeeDetails(drink, detailsContainer);
    });
    return titleElt;
}

function displayCoffeeDetails(drink, container) {
    container.innerHTML = '';

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

    container.appendChild(drinkElt);
}

function renderCoffeeTitles(data, titlesContainer, detailsContainer) {
    titlesContainer.innerHTML = '';
    data.forEach(drink => {
        const titleElt = createTitleElement(drink, detailsContainer);
        titlesContainer.appendChild(titleElt);
    });
}

function fetchAndDisplayCoffeeTitles(url, titlesContainer) {
    const detailsContainer = document.getElementById('coffee-details');
    fetchData(url)
        .then(data => processCoffeeData(data))
        .then(filteredData => renderCoffeeTitles(filteredData, titlesContainer, detailsContainer))
        .catch(error => {
            console.error("Error fetching data: ", error.message);
        });
}
