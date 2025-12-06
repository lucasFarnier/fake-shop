let selectedPhoneColour = "lightgray";
let selectedLaptopColour = "lightgray";



function changevid(buttonLink, Id) {
    const video = document.getElementById(Id);
    currentTime = document.getElementById(Id).currentTime;
    video.src = buttonLink;
    video.load();
    document.getElementById(Id).currentTime = currentTime;
}



//list for  cart and default
let cart = [];
let cartTotal = 0;
let discount = false;

//add item to cart
function buy(name, price, colour) {
    cart.push({ name, price, colour});
    cartTotal += price;

    //runs update func
    updateCartUI(true);
}



//update sidebar cart display
function updateCartUI(adding) {
    //get all elements needed
    const list = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const icon = document.getElementById("cart");
    const prevWidth = icon.offsetWidth;

    //clear list
    list.innerHTML = "";

    //add all items again
    cart.forEach((item, index) => {
        //create element for each item in list
        const li = document.createElement("li");
        li.classList.add("cart-item-start");
        li.innerHTML = `
        <div class="item-top-line">
            ${item.name} - $${item.price}
            <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>
        </div>
        <div class="item-colour" id="item-colour-${index}"></div>`;

        list.appendChild(li);

        document.getElementById("item-colour-" + index).style.backgroundColor= item.colour;

        if (index === cart.length - 1 && adding) {
            requestAnimationFrame(() => {
                li.classList.add("adding");
            }, 300);

            setTimeout(() => {
                li.classList.remove("cart-item-start");
                li.classList.remove("adding");
                li.classList.add("cart-item");
            });
        }
        else {
            li.classList.remove("cart-item-start");
            li.classList.add("cart-item");
        }
    });

    //if not 0 then icon in nav bar shows total
    if (cartTotal > 0) {
        icon.textContent = "🛒 Total: $" + cartTotal;
    }
    //otherwise hide it
    else {
        icon.textContent = "🛒"
    }

    //auto resize icon on navbar
    icon.style.width = "auto";
    const newWidth = icon.offsetWidth;
    icon.style.width = prevWidth + "px";
    requestAnimationFrame(() => {
        icon.style.width = newWidth + "px";
    });

    //update price
    let message
    //checks for discount
    if (discount) {
        message = "Discount: 25% <br>&emsp;&emsp;&emsp;$" + cartTotal + " - $" +(cartTotal-(cartTotal*0.75)) + "<br>Total: $" + cartTotal*0.75;
    }
    else {
        message = "<br>Total: $" + cartTotal;
    }
    total.innerHTML = message;
}



//remove item from cart
function removeFromCart(index) {
    const list = document.getElementById("cart-items");
    const wrap = list.children[index];

    wrap.classList.add("removing");

    setTimeout(() => {
        cartTotal -= cart[index].price;
        cart.splice(index, 1);

        updateCartUI();
    }, 300);
}



var userInput = document.getElementById("promo-code");

userInput.onkeyup = function() {
    if ((userInput.value).trim().toLowerCase() === ("urk is great")) {
        discount = true;
    }
    else {
        discount = false;
    }
    updateCartUI();
};



//get elements for non button clickables
const cartBtn = document.querySelector('.cart');
const cartSidebar = document.getElementById('cart-container');

//shows sidebar when cart button clicked (done cus button is a div)
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('show');
    cartSidebar.classList.remove('hidden');
});



//closes it when close button clicked
function closeSidebar() {
    cartSidebar.classList.remove('show');
    setTimeout(() => cartSidebar.classList.add('hidden'), 300);
}



//trustpilot extension
const trustbox = document.getElementById('trustbox');
window.Trustpilot.loadFromElement(trustbox);