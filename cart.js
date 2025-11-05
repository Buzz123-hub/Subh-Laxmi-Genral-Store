const cartDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalDiv.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} - ₹${item.price} × 
      <button onclick="changeQty(${index}, -1)">-</button>
      ${item.qty}
      <button onclick="changeQty(${index}, 1)">+</button>
      = ₹${item.price * item.qty}
      <button onclick="removeItem(${index})">🗑️</button></p>
    `;
    cartDiv.appendChild(div);
    total += item.price * item.qty;
  });

  totalDiv.innerText = `Total: ₹${total}`;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}
