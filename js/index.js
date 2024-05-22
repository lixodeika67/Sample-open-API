const hotUrl = "https://api.sampleapis.com/coffee/hot";
const icedUrl = "https://api.sampleapis.com/coffee/iced";
const hotCoffeeContainer = document.getElementById('hot-coffee-container');
const icedCoffeeContainer = document.getElementById('iced-coffee-container');

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
            container.innerHTML = ''; // Clear previous content
            data.forEach(drink => {
                let drinkElt = document.createElement("div");
                drinkElt.className = 'drink';

                // Add a header with the drink's title
                const drinkHeader = document.createElement("h2");
                drinkHeader.innerText = drink.title;
                drinkElt.appendChild(drinkHeader);

                // Add an image with the drink's image
                const drinkImage = document.createElement("img");
                drinkImage.src = drink.image;
                drinkImage.alt = drink.title;
                drinkImage.onclick = () => openDrinkDetails(drink);
                drinkElt.appendChild(drinkImage);

                container.appendChild(drinkElt);
            });
        })
        .catch(error => {
            if (error instanceof SyntaxError) {
                console.error("Unparsable response from server");
            } else {
                console.error("Error fetching data: ", error.message);
            }
        });
}

function openDrinkDetails(drink) {
    const newWindow = window.open("", "_blank", "width=400,height=600");
    newWindow.document.write(`
        <html>
        <head>
            <title>${drink.title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                }
                img {
                    max-width: 100%;
                    border-radius: 0.8em;
                }
                h1 {
                    font-size: 2em;
                    margin-bottom: 0.5em;
                }
                p {
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <h1>${drink.title}</h1>
            <img src="${drink.image}" alt="${drink.title}">
            <p>${drink.description}</p>
            <h2>Ingredients:</h2>
            <ul>
                ${drink.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </body>
        </html>
    `);
}

// Initially load hot and iced drinks
fetchCoffeeData(hotUrl, hotCoffeeContainer);
fetchCoffeeData(icedUrl, icedCoffeeContainer);
