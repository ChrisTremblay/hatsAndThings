/**** START OF HAT LOGIC PART 1 ****/

class Hat {
    /* Constructor method of the class Hat */
    constructor(name, price, color, imageHref) {
        this.name = name;
        this.price = price;
        this.color = color;
        this.imageHref = imageHref;
    }

    // Return the formated string of the hat
    toString() {
        return `name: ${this.name}, color: ${this.color}, price: ${this.price}, image: ${this.imageHref}`;
    }
    //Create a new node div and add the right classes before adding the correct inner html depending on the object properties defined
    displayHat() {
        let hatHtml = document.createElement('div');
        hatHtml.classList.add("accessory", "col-sm-4", `${this.color}`);
        hatHtml.innerHTML =
            `<div class="card my-3">
            <div class="currency btn btn-light disabled">${this.price}</div>
            <img class="card-img-top" src="${this.imageHref}" alt="Image of ${this.name}">
            <div class="card-body text-center">
              <h5 class="card-title">${this.name}</h5>
              <p class="card-text">Color: <em>${this.color}</em></p>
              <button class="btn btn-outline-primary">Add to wishlist!</button>
            </div>
          </div>`
        return hatHtml;
    }
}

//Function to display all the hats created in the array
renderHats = (hats) => {
    hats.forEach(e => {
        productContainer.appendChild(e.displayHat());
    });
}

//Get the container of all hats
let productContainer = document.getElementById("products");

//Array of all the hats present in the started HTML page
allHats = [
    new Hat("Baseball cap", 11.99, "red", "./assets/images/red/hats/1.png"),
    new Hat("Baseball cap", 11.99, "blue", "./assets/images/blue/hats/1.png"),
    new Hat("Baseball cap", 11.99, "yellow", "./assets/images/yellow/hats/1.png"),
    new Hat("Baseball cap", 11.99, "green", "./assets/images/green/hats/1.png"),
    new Hat("Beanie", 17.99, "red", "./assets/images/red/hats/2.png"),
    new Hat("Beanie", 17.99, "blue", "./assets/images/blue/hats/2.png"),
    new Hat("Beanie", 17.99, "yellow", "./assets/images/yellow/hats/2.png"),
    new Hat("Beanie", 17.99, "green", "./assets/images/green/hats/2.png"),
    new Hat("Straw hat", 10.99, "yellow", "./assets/images/yellow/hats/3.png"),
    new Hat("Straw hat", 10.99, "blue", "./assets/images/blue/hats/3.png"),
    new Hat("Trilby", 10.99, "red", "./assets/images/red/hats/4.png"),
    new Hat("Trilby", 10.99, "blue", "./assets/images/blue/hats/4.png"),
    new Hat("Trilby", 10.99, "yellow", "./assets/images/yellow/hats/4.png")
];

//Call the render hat function to render the html on the page
renderHats(allHats);

/**** END OF HAT LOGIC PART 1 ****/



/**** START OF FILTER BY COLOR LOGIC PART 2 ****/
highlightSelectedFilter = (selectedFilter) => {
    [...selectedFilter.parentElement.children].forEach(e => {
        if (e.getAttribute("class").includes("active")) {
            e.classList.remove("active");
        }
    });
    selectedFilter.classList.add("active");
}

let filtersParent = document.querySelector("#filters .btn-group");

filtersParent.addEventListener("click", e => {
    highlightSelectedFilter(e.target);
});

/**** END OF FILTER BY COLOR LOGIC PART 2 ****/