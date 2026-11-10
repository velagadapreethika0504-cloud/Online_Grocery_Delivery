
let cart = [];

function addToCart(name, price) {

    let item = cart.find(product => product.name === name);

    if (item) {

        item.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}

function updateCart() {

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;

        total += item.price * item.quantity;

    });

    document.getElementById("cart-count").innerText = count;

    document.getElementById("total").innerText = total;

    let cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty!</p>";

    } else {

        cartItems.innerHTML = cart.map(item => {

            return `
                <p>
                    ${item.name} × ${item.quantity}
                    = ₹${item.price * item.quantity}
                </p>
            `;

        }).join("");

    }

}

function placeOrder() {

    if (cart.length === 0) {

        document.getElementById("order-message").innerText =
            "Please add products to your cart first!";

        return;

    }

    document.getElementById("order-message").innerText =
        "Your order has been placed successfully!";

    cart = [];

    updateCart();

}
