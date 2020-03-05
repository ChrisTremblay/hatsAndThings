let retrieveWishlist = () =>{
    let wishList = [];
    for(let i=1; i<=3; i++){
        if(JSON.parse(sessionStorage.getItem(`accessory${i}`))){
            wishList.push(JSON.parse(sessionStorage.getItem(`accessory${i}`)));
        }
    }
    return wishList;
}

let createHtmlAccessory = (accessory) =>{
    let accessoryHtml = document.createElement('div');
    accessoryHtml.classList.add("col-sm-4");
    accessoryHtml.setAttribute('data-color', `${accessory.color}`);
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

let displayWishlist = (accessories) => {
    accessories.forEach(e => {
        productContainer.appendChild(createHtmlAccessory(e));
    });
}

let removeFromWishlist = (key, htmlComponent) => {
    
}

let productContainer = document.getElementById("products");

let wishList = retrieveWishlist();
if(wishList.length != 0){
    displayWishlist(wishList);
}