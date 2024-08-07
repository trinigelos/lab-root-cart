// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');

  const priceValue = parseFloat(price.innerHTML);
  const quantityValue = parseFloat(quantity.value);

  const subtotalValue = priceValue * quantityValue;

  const subtotal = product.querySelector('.subtotal span');
  subtotal.innerHTML = subtotalValue.toFixed(2);

  return subtotalValue;
}

function calculateAll() {
  // ITERATION 2
  const products = document.getElementsByClassName('product');
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += updateSubtotal(products[i]);
  }

  // ITERATION 3
  const totalValue = document.querySelector('#total-value span');
  totalValue.innerHTML = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);

  // Find parent and remove it:
  const productRow = target.closest('.product');
  productRow.parentNode.removeChild(productRow);

  // Recalculate
  calculateAll();
}

// ITERATION 5

function createProduct() {
  const nameInput = document.querySelector('.new-product-name');
  const priceInput = document.querySelector('.new-product-price');

  const nameValue = nameInput.value;
  const priceValue = parseFloat(priceInput.value).toFixed(2);

  if (nameValue.trim() === '' || priceValue <= 0) {
    alert('Please enter a valid product name and price.');
    return;
  }

  const productRow = document.createElement('tr');
  productRow.classList.add('product');

  productRow.innerHTML = `
    <td class="name"><span>${nameValue}</span></td>
    <td class="price">$<span>${priceValue}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0">
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  const cartBody = document.querySelector('tbody');
  cartBody.appendChild(productRow);

  // Add event listener to the new remove button
  const removeButton = productRow.querySelector('.btn-remove');
  removeButton.addEventListener('click', removeProduct);

  // Clear the input fields
  nameInput.value = '';
  priceInput.value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);

  // Attach event listeners to existing remove buttons
  const removeButtons = document.getElementsByClassName('btn-remove');
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', removeProduct);
  }
});
