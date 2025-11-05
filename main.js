const products = [
  { id: 1, name: "Rice (1kg)", price: 60, category: "groceries", image: "https://www.health.com/thmb/a8GxwWgmB5KpQW8SfW6VA7UFwaI=/722x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1734160670-0157c2daf8e841d6a783b38aedc51aa8.jpg" },
  { id: 2, name: "Sugar (1kg)", price: 50, category: "groceries", image: "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/other/spoonful_of_sugar_other/1800x1200_spoonful_of_sugar_other.jpg" },
  { id: 3, name: "Tea Pack", price: 120, category: "groceries", image: "https://dalmiagold.com/cdn/shop/files/DGELAICHI.jpg?v=1705572806tps://5.imimg.com/data5/SELLER/Default/2021/9/UM/XH/QT/48832030/chai-patti-wholesale-https://m.media-amazon.com/images/I/81HB1udcDZL._SX466_.jpg500x500.jpeghttps://m.media-amazon.com/images/I/81HB1udcDZL._AC_UF894,1000_QL80_.jpg" },
  { id: 4, name: "Soap", price: 25, category: "toiletries", image: "https://rukminim2.flixcart.com/image/480/640/jly1wnk0/soap/b/t/v/4-400-bath-soap-bar-dove-original-imaf8yjryyapk97s.jpeg?q=90" },
  { id: 5, name: "Oil (1L)", price: 150, category: "groceries", image: "https://www.bbassets.com/media/uploads/p/l/40053353_7-mashal-kachi-ghani-mustard-oil.jpg" },
  { id: 6, name: "Chips Pack", price: 20, category: "snacks", image: "https://growstar.in/wp-content/uploads/2021/06/71QLKi5TquL._SX425_.jpg" },
  { id: 7, name: "Toothpaste", price: 35, category: "toiletries", image: "https://www.quickpantry.in/cdn/shop/files/Colgate_Strong_Teeth_Toothpaste_300_g_Quick_Pantry.jpg?v=1731146068&width=1214" }
];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

if (productList) renderProducts(products);
updateCartCount();

function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++;
  else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function searchProducts() {
  const input = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(input));
  renderProducts(filtered);
}

function filterByCategory() {
  const category = document.getElementById("categoryFilter").value;
  if (category === "all") renderProducts(products);
  else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartCount) cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

