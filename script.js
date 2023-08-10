
let menu = document.querySelector("#menu-bar");
let sideBar = document.querySelector(".side-bar-container");
let main_image = document.querySelector("#product-image");
let lightBox_main_image = document.querySelector("#light-box-main-image");
let sub_images = document.querySelector(".product-pictures")//main image thumbnails parent
let lightBox_sub_images = document.querySelector(".product-thumbnails") //lightbox thumbnails parent
let lightBox = document.querySelector(".light-box")
let cancel_btn = document.querySelector("#cancel-btn");
let hideMenu = document.querySelector("#hide-side-bar");
let nextImage = document.querySelector("#nav-next");
let previousImage = document.querySelector("#nav-back");
let nextImageForMobile = document.querySelector("#nav-next-mobile");
let previousImageForMobile = document.querySelector("#nav-back-mobile");
let userSelectedQuantity = document.getElementById("quantity");
let addToCart = document.querySelector("#add-to-cart");
let itemInCart = document.querySelector("#item-in-cart");
let decreasebtn = document.querySelector("#decrease-quantity");
let increasebtn = document.querySelector("#increase-quantity");
let totalPrice = document.querySelector("#total-price");
let totalItems = document.querySelector("#total-items");
let userCart = document.querySelector("#cart");
let cartContainer = document.querySelector(".cart-info");
let cartDetails = document.querySelector(".dsiplay-cart");
let orderDetails = document.querySelector(".order-details");
let emptyCart = document.querySelector("#empty-cart");
let checkOut = document.querySelector("#check-out");
let clearCart = document.querySelector("#delete");


let thumbnails = Array.from(sub_images.children); //making parent elemnet's children an array



function activateSideBar() {
    sideBar.style.display = "block";
    document.querySelector("nav").style.opacity = ".5"
    document.querySelector("img").opacity = ".5"

}

function hideSideBar() {
    document.querySelector("nav").style.opacity = "1"
    sideBar.style.display = "none";

}


function removeEffectsFromThumbnails() {


    // Class "after-clicked" will be toggled when user click on thumbnail and border and opacity will be reset
    // Class "on-click" will be removed when user click on thumbnail and will later set by then function who call this one

    //creating temporary array to traverse all sub images 
    let tempArray = Array.from(sub_images.children)


    tempArray.forEach(element => {
        element.classList.toggle("after-clicked")
        element.classList.remove("on-click")

    });


    //creating temporary array to traverse all sub images of lightbox
    let tempArray_02 = Array.from(lightBox_sub_images.children)

    tempArray_02.forEach(element => {
        element.classList.toggle("after-clicked")
        element.classList.remove("on-click")

    });
}


function changeMainImage(event) {


    removeEffectsFromThumbnails(); //handle border and opacity

    let target = event.target;

    if (target.matches("img")) {

        target.classList.add("on-click") //will add "on-click" class to activate border and opacity


        if (target.parentElement.className == "product-pictures") {
            main_image.src = target.src.replace("-thumbnail", "");

            return;
        }

        lightBox_main_image.src = target.src.replace("-thumbnail", "");
    }
}


function showLightBox() {


    if (window.matchMedia("(min-width: 654px)").matches) {
        lightBox.style.display = "block";
    }
}

function hideLightBox(event) {
    event.stopPropagation();

    lightBox.style.display = "none";

}


function findImageIndex(event) {
    let currentImage;

    let target = event.target.parentElement;

    if ((target.classList.contains("nav-mobo-buttons")) || (target.className == "main-product-image")) {
        currentImage = main_image.src;
    }

    else {
        removeEffectsFromThumbnails();
        currentImage = lightBox_main_image.src;

    }

    let index = 0;

    for (; index < thumbnails.length; index++) {

        if (thumbnails[index].src.replace("-thumbnail", "") == currentImage) {
            break;
        }
    }

    return index;
}

function nextPicture(event) {

    let index = findImageIndex(event);
    index = (index + 1) % thumbnails.length;
    lightBox_main_image.src = thumbnails[index].getAttribute("src").replace("-thumbnail", "");

}

function previousPicture(event) {

    let index = findImageIndex(event);
    index = (index - 1 + thumbnails.length) % thumbnails.length;
    lightBox_main_image.src = thumbnails[index].getAttribute("src").replace("-thumbnail", "");

}


function nextPictureMobo(event) {

    let index = findImageIndex(event);
    index = (index + 1) % thumbnails.length;
    main_image.src = thumbnails[index].getAttribute("src").replace("-thumbnail", "");

}

function previousPictureMobo(event) {

    let index = findImageIndex(event);
    index = (index - 1 + thumbnails.length) % thumbnails.length;
    main_image.src = thumbnails[index].getAttribute("src").replace("-thumbnail", "");

}


function checkQuantity() {
    let items = userSelectedQuantity.value;

    items = items.replace(/\s/g, '');

    // Check if the input contains non-digit characters (alphabets or special characters)

    if (/\D/.test(items)) {
        userSelectedQuantity.style.border = "1px solid red";
    }

    else {
        userSelectedQuantity.style.border = "none";
    }
}


function setUserCart() {

    if (userSelectedQuantity.value <= 0) {
        return;
    }

    //checking if there is no item in the cart, then set total amount of items to zero
    //Because if without checking this condition, if add selected quantity to already present items in cart(which is initially zero)
    // will generate "NaN", which is a unexpected behaviour of a program
    if (isNaN(parseInt(itemInCart.textContent))) {
        itemInCart.textContent = 0;
    }


    let alreadyItem = parseInt(itemInCart.textContent); //fetching already number of items present in cart
    alreadyItem += parseInt(userSelectedQuantity.value); //adding newly selected quantity to already items in cart
    

    itemInCart.textContent = alreadyItem;
     userSelectedQuantity.value = ""; //after adding items in the cart, resetting the input value.

    totalItems.textContent = alreadyItem;
    totalPrice.textContent = "$" + (alreadyItem * 125) + ".00";
}


function decreaseQuantity() {

    if (isNaN(parseInt(userSelectedQuantity.value))) {
        userSelectedQuantity.value = 0;
    }

    let quantity = parseInt(userSelectedQuantity.value);
    quantity--;

    if (quantity < 0) {
        quantity = "";
    }

    userSelectedQuantity.value = quantity;

}


function increaseQuantity() {

    if (isNaN(parseInt(userSelectedQuantity.value))) {
        userSelectedQuantity.value = 0;
    }

    let quantity = parseInt(userSelectedQuantity.value);
    quantity++;

    userSelectedQuantity.value = quantity;

}


function displayCart(event) {
    event.stopPropagation();
    cartContainer.style.display = "block";

    if (itemInCart.textContent === "") {
       
        emptyCart.style.display = "block";
        checkOut.style.display = "none";
        orderDetails.style.display = "none";
        return;
    }

    emptyCart.style.display = "none";
    checkOut.style.display = "block";
    orderDetails.style.display = "flex";

}

function hideCart() {
    cartContainer.style.display = "none";
}


//function to clear cart 
function clearCartItems(event) {
    //resetting item cart to empty string, beacause it is responsible for diplaying empty or non empty cart
    itemInCart.textContent = "";  
    userSelectedQuantity.value = ""; 
    setUserCart();
    displayCart(event);
   
}


menu.addEventListener("click", activateSideBar);

hideMenu.addEventListener("click", hideSideBar);

main_image.addEventListener("click", showLightBox);

sub_images.addEventListener("click", changeMainImage);
lightBox_sub_images.addEventListener("click", changeMainImage);


cancel_btn.addEventListener("click", hideLightBox);

// Event listener for the next button
nextImage.addEventListener("click", nextPicture);

// Event listener for the previous button
previousImage.addEventListener("click", previousPicture);

// Event listener for the next button in mobile
nextImageForMobile.addEventListener("click", nextPictureMobo)

// Event listener for the previous button in mobile
previousImageForMobile.addEventListener("click", previousPictureMobo)


window.addEventListener("resize", (event) => {
    if (window.matchMedia("(max-width: 653px)").matches) {

        main_image.removeEventListener("click", showLightBox);
        hideLightBox(event);
    }

    else {
        main_image.addEventListener("click", showLightBox);
        hideSideBar();
    }
})

userSelectedQuantity.addEventListener("input", checkQuantity)

addToCart.addEventListener("click", setUserCart);

decreasebtn.addEventListener("click", decreaseQuantity)
increasebtn.addEventListener("click", increaseQuantity)
userCart.addEventListener("click", displayCart)
clearCart.addEventListener("click", clearCartItems)


// Adding click event listener to the document to hide cart info
document.addEventListener('click', function (event) {
    // Get the clicked target element
    const clickedElement = event.target;

    // If the click is outside the cart related elements, remove the hide cart info
    if (!(clickedElement.parentElement.className.includes("toggle"))) {
        hideCart();

    }
});




