//Retrieve wishlist from session storage
let retrieveWishlist = () => {
    let wishList = [];
    for (let i = 1; i <= 3; i++) {
        //Build again the list of object from the string stored in the session storage
        if (JSON.parse(sessionStorage.getItem(`accessory${i}`))) {
            wishList.push(JSON.parse(sessionStorage.getItem(`accessory${i}`)));
        }
    }
    return wishList;
}

//Create the HTML code corresponding to the object accessory
let createHtmlAccessory = (accessory, index) => {
    let accessoryHtml = document.createElement('div');
    accessoryHtml.classList.add("col-sm-4");
    //Here we use an attribute index to make it easier for us to follow the deleting afterwards
    accessoryHtml.setAttribute('data-index', `${index}`);
    accessoryHtml.innerHTML =
        `<div class="card my-3">
        <div class="currency btn btn-light disabled">${accessory.price}</div>
        <img class="card-img-top" src="${accessory.imageHref}" alt="Image of ${accessory.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${accessory.name}</h5>
          <p class="card-text">Color: <em>${accessory.color}</em></p>
          <button class="btn btn-outline-danger">Remove</button>
          </div>
        </div>
      </div>`
    return accessoryHtml;
}

//Calls for each accessory the creation of the HTML and appends it to the container
let displayWishlist = (accessories) => {
    accessories.forEach((e, index) => {
        productContainer.appendChild(createHtmlAccessory(e, index + 1));
    });
}

//Simply remove the accessory from the session storage depending on the key and remove the node too
let removeFromWishlist = (htmlComponent, key) => {
    sessionStorage.removeItem(`accessory${key}`);
    htmlComponent.parentNode.removeChild(htmlComponent);

    /*This next part is to handle the change of the indexs when deleting, so that we can go back to the shopping list and add more wishlist items without clearing the session storage */
    //Here we re-index the data-index attribute to make it go again from 1
    let newIndexAttribute = 1;
    [...productContainer.children].forEach(e=>{
        e.setAttribute(`data-index`, newIndexAttribute);
        newIndexAttribute++;
    });

    //Here we reorganize the sessionStorage key values accessories so that they start again to 1
    let tempStorage = [];
    for(let i=1; i<=sessionStorage.length; i++){
        if(sessionStorage.getItem(`accessory${i}`)){
            tempStorage.push(sessionStorage.getItem(`accessory${i}`));
        }
    }
    sessionStorage.clear();
    for(let i = 0; i<tempStorage.length; i++){
        sessionStorage.setItem(`accessory${i+1}`, tempStorage[i]);
    }
    /* Without this part, a bug where you cannot add more items appear */
}

//We listen on the products container to counteract the static listening of the queryselectorALL
let productContainer = document.getElementById("products");
productContainer.addEventListener("click", e => {
    //If the user clicked the button we call the function
    if (e.target.tagName == "BUTTON") {
        //By browsing the DOM we can easily find the parent of the accessory to pass it to the function as well as the index which will allow us to delete it from the session storage
        removeFromWishlist(e.target.parentNode.parentNode.parentNode, e.target.parentNode.parentNode.parentNode.getAttribute('data-index'));
    }
});

//We initialize the page
let wishList = retrieveWishlist();
//And only display a wishlist if its not empty
if (wishList.length != 0) {
    displayWishlist(wishList);
}