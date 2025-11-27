function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// -----------------------------
let products = [];

// -----------------------------
// Load Products from API
async function loadProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  products = await res.json();
  displayProducts(products);
}

// -----------------------------
// Display Products
function displayProducts(productsArray) {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = '';

  productsArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className =
      'w-full max-w-sm mx-auto bg-white border border-blue-200 rounded-xl shadow p-4 flex flex-col items-center';
    productCard.innerHTML = `
      <img src="${product.image}" class="h-40 object-contain mb-4" alt="productImage">
      <h2 class="text-lg font-bold text-blue-900 mb-2 text-center">${product.title}</h2>
      <p class="text-xl font-bold text-green-800 mb-2">$${product.price}</p>
      <p class="text-gray-700 text-sm text-center">${product.description.substring(0, 80)}...</p>
      <button class="text-blue-600 hover:text-blue-800 mt-2 font-semibold text-sm">See More</button>
    `;

    productCard.addEventListener("click", () => showProductDetails(product));
    productsContainer.appendChild(productCard);

  });
}
//Product Details
function showProductDetails(product) {
  const productModal = document.getElementById('miniModal');
  productModal.classList.remove('hidden');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = product.image;
  const modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = product.title;
  const modalPrice = document.getElementById('modalPrice');
  modalPrice.textContent = `$${product.price}`;
  const modalDescription = document.getElementById('modalDescription');
  modalDescription.textContent = product.description;
}
document.getElementById('closeModal').addEventListener('click', () => {
  const productModal = document.getElementById('miniModal');
  productModal.classList.add('hidden');
})
// -----------------------------
// Load Categories
async function loadCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await res.json();

  const categoryChip = document.getElementById('categoryChip');

  // All button
  const allButton = document.createElement('button');
  allButton.textContent = 'All';
  allButton.className = 'py-2 px-4 bg-blue-900 hover:bg-blue-700 text-white font-bold rounded-xl';
  allButton.addEventListener('click', () => displayProducts(products));
  categoryChip.appendChild(allButton);

  // Other categories
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = capitalizeFirstLetter(category);
    btn.className = 'py-2 px-4 bg-blue-900 hover:bg-blue-700 text-white font-bold rounded-xl';
    btn.addEventListener('click', () => {
      const filtered = products.filter(p => p.category === category);
      displayProducts(filtered);
    });
    categoryChip.appendChild(btn);
  });
}

// -----------------------------
// Search Products
function searchProducts() {
  const searchField = document.getElementById('searchField');
  searchField.addEventListener('input', () => {
    const query = searchField.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    displayProducts(filtered);
  });
}

// -----------------------------
// Initialize everything
loadProducts();
loadCategories();
searchProducts();


//--------------------------------------------------------//



//Search products
//Search products
// searchProducts(
//     // TODO: listen for input event on search field
//     // TODO: filter products by name
//     // TODO: re-display filtered products

// )
//--------------------------------------------------------//

//Filter products by category
//Filter products by category
// filterByCategory(
//     // TODO: filter products based on selected category

// )
//--------------------------------------------------------//

//Show product details on click
//Show product details on click
// showProductDetails()
//--------------------------------------------------------//

