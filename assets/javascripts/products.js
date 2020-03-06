class Accessory {
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
    displayAccessory() {
        let accessoryHtml = document.createElement('div');
        accessoryHtml.classList.add("accessory", "col-sm-4");
        //The data-color attribute is here set to help us with filtering later on
        accessoryHtml.setAttribute('data-color', `${this.color}`);
        accessoryHtml.innerHTML =
            `<div class="card my-3">
            <div class="currency btn btn-light disabled">${this.price}</div>
            <img class="card-img-top" src="${this.imageHref}" alt="Image of ${this.name}">
            <div class="card-body text-center">
              <h5 class="card-title">${this.name}</h5>
              <p class="card-text">Color: <em>${this.color}</em></p>
              <button class="btn btn-outline-primary">Add to wishlist!</button>
            </div>
          </div>`
        return accessoryHtml;
    }
}

//Not necessary but can be prepared if we ever do some extension on the different type of accessories. E.g: Size of accessories that differ in properties if this is a hat, glove or socks
class Hat extends Accessory {
    constructor(name, price, color, imageHref) {
        super(name, price, color, imageHref);
    }
}
class Socks extends Accessory {
    constructor(name, price, color, imageHref) {
        super(name, price, color, imageHref);
    }
}
class Sunglasses extends Accessory {
    constructor(name, price, color, imageHref) {
        super(name, price, color, imageHref);
    }
}
class Gloves extends Accessory {
    constructor(name, price, color, imageHref) {
        super(name, price, color, imageHref);
    }
}

//Function to display all the hats created in the array
let renderAccessories = (accessories) => {
    accessories.forEach(e => {
        productContainer.appendChild(e.displayAccessory());
    });
}

//Function to remove all accessories present on the page when changing the filtering, we just loop over all the children of the products container to remove them one by one
let removeAllAccessories = (container) => {
    [...productContainer.children].forEach(e => {
        container.removeChild(e);
    });
}

//Function to initialise the app: render first page with given hats (could have been loaded from a json file too but the exercice asked to leave it in the code) and also store for later the first page render as well as the current page render
let init = () => {
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
    let firstPageHats = JSON.stringify(allHats);
    localStorage.setItem('firstPage', firstPageHats);
    localStorage.setItem('renderedPage', firstPageHats);

    //Call the render hat function to render the html on the page
    renderAccessories(allHats);
}

//Highlight the selected filter by first removing the active class on the previous filter and then putting it on the selected one
highlightSelectedFilter = (selectedFilter) => {
    [...selectedFilter.parentElement.children].forEach(e => {
        if (e.getAttribute("class").includes("active")) {
            e.classList.remove("active");
        }
    });
    selectedFilter.classList.add("active");
}
/*Filter logic: We first show everything to mimic the all filter and make sure to reset any filter already applied
Then if the filter All was not selected and that the innerHTML of the filter do not correspond to the data-color attribute of the div we hide it
*/
let filterHatsByColor = (selectedFilter) => {
    [...productContainer.children].forEach(e => {
        e.style.display = "block";
        if (selectedFilter.innerHTML.toLowerCase() != "all") {
            if (selectedFilter.innerHTML.toLowerCase() != e.getAttribute('data-color').toLowerCase()) {
                e.style.display = "none";
            }
        }
    });
}

//Let us build and render the page based on json data
let buildCurrentPage = (jsonData) =>{
    let newArrayAccessories = [];
    jsonData.forEach(e => {
        newArrayAccessories.push(new Accessory(e.name, e.price, e.color, e.imageHref))
    });
    //Store the current rendered page locally for the wishlist use later on
    let currentRenderedPage = JSON.stringify(newArrayAccessories);
    localStorage.setItem('renderedPage', currentRenderedPage);
    
    //To render the page with the correct accessories selected
    renderAccessories(newArrayAccessories);
}

let loadRemoteAccessories = (navClicked) => {
    //First we remove the display of any active filter
    activeFilterToReset = document.querySelector("#filters .active");
    //If there is an active filter then we remove the class active
    if (activeFilterToReset) {
        activeFilterToReset.classList.remove("active");
    }
    //We then remove all accessories on the page
    removeAllAccessories(productContainer);

    //If we did not click on the hats filter
    if (`${navClicked.innerHTML.toLowerCase()}` != "hats") {
        //then we fetch the correct file thanks to the innerHTML
        fetch(`./${navClicked.innerHTML.toLowerCase()}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                buildCurrentPage(myJson);
            });
    //But if the hats section is clicked we render the first page
    } else {
        buildCurrentPage(JSON.parse(localStorage.getItem("firstPage")));
    }
}

//Function to add to the wish list the selected accessory, makes sure not more than 3. We store the accessory in the session storage to retrieve it in the session
let addToWishlist = (accessory) => {
    if (sessionStorage.length < 4) {
        sessionStorage.setItem(`accessory${sessionStorage.length}`, JSON.stringify(accessory));
    } else {
        alert("Wishlist already full");
    }
}


//Queries of the DOM
let productContainer = document.getElementById("products");
let navParent = document.querySelector("#navbarSupportedContent ul");
let filtersParent = document.querySelector("#filters .btn-group");

navParent.addEventListener("click", e => {
    if (e.target.tagName == "BUTTON") {
        //Prevent firing of the event when clicking next to the button
        loadRemoteAccessories(e.target);
    }
});

//Listener on queries
productContainer.addEventListener("click", e => {
    if (e.target.tagName == "BUTTON") {
        //Get the container of the accessory
        let accessoryNode = e.target.parentNode.parentNode.parentNode;
        //Counter to get back which accessory
        let indexNode = 0;
        //We browse the productContainer until we find the node clicked, get back the index of this node to browse the currentPage loaded of objects to pass it to the funtion
        for (let i = 0; i < productContainer.children.length; i++) {
            if (accessoryNode != productContainer.children[i]) {
                indexNode++;
            } else {
                break;
            }
        }
        //We get back the localstorage of the rendered page
        let currentPage = JSON.parse(localStorage.getItem("renderedPage"));
        //And we pass it with the correct index
        addToWishlist(currentPage[indexNode]);
    }
});

//We listen on the parent of the filter buttons to avoid looping on each one of them and we manipulate the filter by event bubbling and the .target property
filtersParent.addEventListener("click", e => {
    highlightSelectedFilter(e.target);
    filterHatsByColor(e.target);
});

/* INIT APP */
init();