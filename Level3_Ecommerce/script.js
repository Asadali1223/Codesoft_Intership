const products = [
    { id: 1, name: "Wireless Headphones", price: 1999, category: "electronics", image: "headphone.webp" },
    { id: 2, name: "Smart Watch", price: 2999, category: "electronics", image: "watch.png" },
    { id: 3, name: "Casual T-Shirt", price: 799, category: "fashion", image: "Tshirt.jpg" },
    { id: 4, name: "Sneakers", price: 2499, category: "fashion", image: "snekers.avif" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

/* DISPLAY PRODUCTS */
function displayProducts(list) {
    productList.innerHTML = "";
    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="openProductModal(${p.id})">View</button>
        `;
        productList.appendChild(div);
    });
}

/* PRODUCT MODAL */
function openProductModal(id) {
    selectedProduct = products.find(p => p.id === id);
    document.getElementById("modalImage").src = selectedProduct.image;
    document.getElementById("modalName").innerText = selectedProduct.name;
    document.getElementById("modalCategory").innerText = selectedProduct.category;
    document.getElementById("modalPrice").innerText = selectedProduct.price;
    document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function addToCartFromModal() {
    addToCart(selectedProduct.id);
    closeProductModal();
}

/* CART LOGIC */
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++;
    else cart.push({ ...products.find(p => p.id === id), qty: 1 });
    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

function updateQty(id, qty) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty = Math.max(1, qty);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function openCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(i => {
        total += i.price * i.qty;
        cartItems.innerHTML += `
            <p>${i.name} × ${i.qty} – ₹${i.price * i.qty}
            <button onclick="updateQty(${i.id}, ${i.qty + 1})">+</button>
            <button onclick="updateQty(${i.id}, ${i.qty - 1})">-</button>
            <button onclick="removeFromCart(${i.id})">❌</button></p>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
    document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

/* CHECKOUT */
function openCheckout() {
    const summary = document.getElementById("orderSummary");
    summary.innerHTML = cart.map(i => `${i.name} × ${i.qty}`).join("<br>");
    document.getElementById("checkoutModal").style.display = "flex";
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

function placeOrder() {
    cart = [];
    saveCart();
    document.getElementById("orderSuccess").innerText = "✅ Order placed successfully!";
}

/* THEME */
function toggleTheme() {
    document.body.classList.toggle("dark");
}

/* INIT */
displayProducts(products);
updateCartUI();