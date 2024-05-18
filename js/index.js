// fetch all the hot drinks from the Sample API
//   Add all the hot drinks and their info to the container in the coffee section

// fetch the page

const url = "https://api.sampleapis.com/coffee/hot";
const coffeeContainer = document.getElementById('coffee-container');

fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch coffee data");
        }
    })
    .then((data) => {
        console.log(data);
        // Create a new element for each coffee type
        data.forEach(drink => {
            let drinkElt = document.createElement("div");
            drinkElt.className = 'drink';

            // add a header with the drink's title
            const drinkHeader = document.createElement("h2");
            drinkHeader.innerText = drink.title;
            drinkElt.appendChild(drinkHeader);

            // add an image with the drink's image
            const drinkImage = document.createElement("img");
            drinkImage.src = drink.image;
            drinkImage.alt = drink.title;
            drinkElt.appendChild(drinkImage);

            coffeeContainer.appendChild(drinkElt);
        });
    })
    .catch((error) => {
        if (error instanceof SyntaxError) {
            console.error("Unparsable response from server");
        } else {
            console.error("Error fetching data: ", error.message);
        }
    });