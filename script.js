
const products = [
    { id: 1, name: "Apples", price: 120, unit: "kg", category: "Fruits", image: "🍎" },
    { id: 2, name: "Bananas", price: 50, unit: "dozen", category: "Fruits", image: "🍌" },
    { id: 3, name: "Oranges", price: 80, unit: "kg", category: "Fruits", image: "🍊" },
    { id: 4, name: "Grapes", price: 90, unit: "kg", category: "Fruits", image: "🍇" },
    { id: 5, name: "Watermelon", price: 40, unit: "kg", category: "Fruits", image: "🍉" },

    { id: 6, name: "Tomatoes", price: 30, unit: "kg", category: "Vegetables", image: "🍅" },
    { id: 7, name: "Potatoes", price: 35, unit: "kg", category: "Vegetables", image: "🥔" },
    { id: 8, name: "Carrots", price: 45, unit: "kg", category: "Vegetables", image: "🥕" },
    { id: 9, name: "Onions", price: 40, unit: "kg", category: "Vegetables", image: "🧅" },
    { id: 10, name: "Spinach", price: 25, unit: "bunch", category: "Vegetables", image: "🥬" },

    { id: 11, name: "Milk", price: 60, unit: "litre", category: "Dairy", image: "🥛" },
    { id: 12, name: "Curd", price: 40, unit: "pack", category: "Dairy", image: "curd" },
    { id: 13, name: "Paneer", price: 100, unit: "pack", category: "Dairy", image: "paneer" },
    { id: 14, name: "Butter", price: 55, unit: "pack", category: "Dairy", image: "🧈" },
    { id: 15, name: "Cheese", price: 90, unit: "pack", category: "Dairy", image: "🧀" }
];

// CURD IMAGE - ORIGINAL SVG

const curdImage = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

    <ellipse cx="60" cy="54" rx="48" ry="29"
        fill="#d9dfe0"/>

    <path d="M12 52
             Q60 80 108 52
             L96 91
             Q60 116 24 91 Z"
        fill="#b9dce5"/>

    <path d="M16 51
             Q60 77 104 51
             Q100 66 60 69
             Q20 66 16 51"
        fill="#ffffff"/>

    <ellipse cx="60" cy="51" rx="44" ry="23"
        fill="#ffffff"
        stroke="#d8d8d8"
        stroke-width="2"/>

    <path d="M25 58 Q60 76 95 58"
        fill="none"
        stroke="#f1f1f1"
        stroke-width="2"/>

    <path d="M24 88 Q60 108 96 88"
        fill="none"
        stroke="#8fc4d3"
        stroke-width="2"/>

</svg>
`;

// PANEER IMAGE - EXACTLY TWO PIECES

const paneerImage = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

    <polygon points="18,56 46,41 74,54 46,69"
        fill="#ffffff" stroke="#dedede" stroke-width="2"/>

    <polygon points="18,56 46,69 46,94 18,81"
        fill="#f5f3ed" stroke="#dedede" stroke-width="2"/>

    <polygon points="46,69 74,54 74,79 46,94"
        fill="#e9e6dc" stroke="#dedede" stroke-width="2"/>

    <polygon points="57,29 80,17 103,29 80,42"
        fill="#ffffff" stroke="#dedede" stroke-width="2"/>

    <polygon points="57,29 80,42 80,63 57,51"
        fill="#f5f3ed" stroke="#dedede" stroke-width="2"/>

    <polygon points="80,42 103,29 103,51 80,63"
        fill="#e9e6dc" stroke="#dedede" stroke-width="2"/>

</svg>
`;

function getProductImage(image) {
    if (image === "curd") {
        return curdImage;
    }

    if (image === "paneer") {
        return paneerImage;
    }

    return image;
}

// CART AND CATEGORY

let cart = [];
let selectedCategory = "All";

// DISPLAY PRODUCTS

function displayProducts() {
    const container = document.getElementById("productContainer");
    const searchText = document.getElementById("searchInput").value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    filteredProducts.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    ${getProductImage(product.image)}
                </div>

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price} / ${product.unit}
                </p>

                <button class="add-button"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

// CATEGORY FILTER

function filterProducts(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".categories button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    displayProducts();
}

// ADD TO CART

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

// REMOVE FROM CART

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    displayCart();
}

// DISPLAY CART

function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
        cartTotal.textContent = "Total: ₹0";
        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name} × ${item.quantity}
                    - ₹${itemTotal}
                </span>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    cartTotal.textContent = `Total: ₹${total}`;
}

// PLACE ORDER

function placeOrder() {

    if (cart.length === 0) {
        alert("Please add products to your cart first.");
        return;
    }

    document.getElementById("shoppingPage").classList.add("hidden");

    document.getElementById("deliveryPage").classList.remove("hidden");

    window.scrollTo(0, 0);
}

// BACK TO SHOPPING

function backToShopping() {

    document.getElementById("deliveryPage").classList.add("hidden");

    document.getElementById("shoppingPage").classList.remove("hidden");

    window.scrollTo(0, 0);
}

// DELIVERY FORM

document.getElementById("deliveryForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const address = document.getElementById("address").value.trim();

    const city = document.getElementById("city").value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const orderId = "FC" + Date.now().toString().slice(-8);

    let orderedProducts = "";

    cart.forEach(item => {

        orderedProducts += `
            <p>
                ${item.name} × ${item.quantity}
                - ₹${item.price * item.quantity}
            </p>
        `;
    });

    document.getElementById("orderDetails").innerHTML = `

        <h3>Order ID: ${orderId}</h3>

        <p><strong>Name:</strong> ${escapeHTML(customerName)}</p>

        <p><strong>Mobile:</strong> ${escapeHTML(mobile)}</p>

        <p><strong>Address:</strong> ${escapeHTML(address)}, ${escapeHTML(city)}</p>

        <h3>Ordered Products</h3>

        ${orderedProducts}

        <h3>Total Amount: ₹${total}</h3>

    `;

    document.getElementById("deliveryPage").classList.add("hidden");

    document.getElementById("confirmationPage").classList.remove("hidden");

    window.scrollTo(0, 0);
});

// HTML SECURITY

function escapeHTML(value) {

    return value.replace(/[&<>"']/g, character => {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];
    });
}

// CONTINUE SHOPPING

function continueShopping() {

    cart = [];

    displayCart();

    document.getElementById("confirmationPage").classList.add("hidden");

    document.getElementById("shoppingPage").classList.remove("hidden");

    document.getElementById("deliveryForm").reset();

    window.scrollTo(0, 0);
}

// INITIAL DISPLAY

displayProducts();
displayCart();
