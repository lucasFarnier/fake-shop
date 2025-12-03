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



let cart = [];
let cartTotal = 0;

// Add item to cart
function buy(name, price) {
    cart.push({ name, price });
    cartTotal += price;

    updateCartUI();
    toggleCart(); // open cart when added
}

// Update sidebar cart display
function updateCartUI() {
    const list = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    // Clear list
    list.innerHTML = "";

    // Add all items again
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>
        `;
        list.appendChild(li);
    });

    // Update price
    total.textContent = "Total: $" + cartTotal;
}

// Remove item from cart
function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const cart = document.getElementById("cart-container");
    const overlay = document.getElementById("cart-overlay");

    const isOpen = cart.classList.contains("show");

    if (isOpen) {
        cart.classList.remove("show");
        cart.classList.add("hidden");

        overlay.classList.remove("show");
        overlay.classList.add("hidden");
    } else {
        cart.classList.remove("hidden");
        cart.classList.add("show");

        overlay.classList.remove("hidden");
        overlay.classList.add("show");
    }
}

const cartBtn = document.querySelector('.cart');
const cartSidebar = document.getElementById('cart-container');
const closeBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('show');
    cartSidebar.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
    setTimeout(() => cartSidebar.classList.add('hidden'), 300); // wait for animation
});



const trustbox = document.getElementById('trustbox');
window.Trustpilot.loadFromElement(trustbox);