function changevid(buttonLink) {
    const video = document.getElementById("vidLaptop");
    currentTime = document.getElementById("vidLaptop").currentTime;
    video.src = buttonLink;
    video.load();
    document.getElementById("vidLaptop").currentTime = currentTime;
}
//please ignore i will fix promise
function changevid2(buttonLink) {
    const video = document.getElementById("vidPhone");
    currentTime = document.getElementById("vidPhone").currentTime;
    video.src = buttonLink;
    video.load();
    document.getElementById("vidPhone").currentTime = currentTime;
}



//list for  cart and default
let cart = [];
let cartTotal = 0;
let discount = false;

//add item to cart
function buy(name, price) {
    cart.push({ name, price });
    cartTotal += price;

    //runs update func
    updateCartUI();
}

// update sidebar cart display
function updateCartUI() {
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
        li.innerHTML = `${item.name} - $${item.price} <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>`;
        list.appendChild(li);
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
    cartTotal -= cart[index].price;
    cart.splice(index, 1);

    //runs update func
    updateCartUI();
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