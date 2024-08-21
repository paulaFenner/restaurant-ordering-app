import { menuArray } from './data.js';

let order = [];
let orderSum = 0;

const mainEl = document.querySelector('main');
const orderContainerEl = document.querySelector('.order-container');
let shoppingCartEl = document.querySelector('.shopping-cart');
let completeOrderBtn = document.getElementById('complete-order-btn');
const modalInnerEl = document.getElementById('modal-inner');
const modalPaymentEl = document.getElementById('modal');

mainEl.addEventListener('click', handleItemSelected);
completeOrderBtn.addEventListener('click', handleCheckout);
modalInnerEl.addEventListener('submit', handleFormSubmission);

function populateMenuContainer() {
  for (let menuItem of menuArray) {
    generateMenuList(menuItem);
  }
}

function generateMenuList(menuItem) {
  const menuContainerEl = document.querySelector('.menu-container');
  menuContainerEl.innerHTML += `
      <section class="menu-item">
          <span class="item-image" >${menuItem.emoji}</span>
          <div class="item-description">
              <h2>${menuItem.name}</h2>
              <p class="item-ingredients">${menuItem.ingredients}</p>
              <p class="price">€ ${menuItem.price}</p>
          </div>
          <button class="item-add-btn" data-add="${menuItem.id}" aria-label="add item">+</button>
      </section>
        `;
}

function handleItemSelected(e) {
  const productId = Number(e.target.dataset.add || e.target.dataset.remove);
  const product = menuArray.filter((item) => item.id === productId)[0];

  if (e.target.dataset.add) {
    appendOrder(product);
  } else if (e.target.dataset.remove) {
    removeItemFromOrder(product);
  }
}

function appendOrder(product) {
  if (product) {
    const existingProductIndex = order.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      order[existingProductIndex].quantity = (order[existingProductIndex].quantity || 1) + 1;
    } else {
      order.push({ ...product, quantity: 1 });
    }
    orderSum += product.price;
    orderContainerEl.style.display = 'block';

    updateShoppingCart();
  }
}

// function appendOrder(product) {
//   if (product) {
//     order.push(product);
//     orderSum += product.price;
//     orderContainerEl.style.display = 'block';

//     updateShoppingCart();
//   }
// }

function removeItemFromOrder(product) {
  const productIndex = order.findIndex((item) => item.id === product.id);

  if (productIndex !== -1) {
    if (order[productIndex].quantity > 1) {
      order[productIndex].quantity -= 1;
      orderSum -= product.price;
    } else {
      order.splice(productIndex, 1);
      orderSum -= product.price;
    }
    generateTotalPrice();
    updateShoppingCart();

    if (order.length === 0) {
      orderContainerEl.style.display = 'none';
    }
  }
}

// function removeItemFromOrder(product) {
//   const productIndex = order.findIndex((item) => item.id === product.id);

//   if (productIndex !== -1) {
//     order.splice(productIndex, 1); // Remove the product from the order array

//     orderSum -= product.price; // Recalculate the total price after removing the product
//     generateTotalPrice();
//     updateShoppingCart();

//     // Hide the order section if the order is empty
//     if (order.length === 0) {
//       orderContainerEl.style.display = 'none';
//     }
//   }
// }

function generateOrderList(product) {
  shoppingCartEl.innerHTML += `
      <li class="order-item">
          <h4>${product.name}</h4>
          <button class="remove-btn" data-remove="${product.id}"  id="remove-btn" aria-label="remove item">remove</button>
          <p class="item-quantity">${product.quantity} x</p>
          <p class="price"><span>€</span>${product.price}</p>
      </li>
       `;

  generateTotalPrice(product);
}

function generateTotalPrice() {
  document.querySelector('.order-total').innerHTML = `
      <h4>Total price:</h4>
      <p class="price">€${orderSum}</p>
       `;
}

function updateShoppingCart() {
  shoppingCartEl.innerHTML = '';
  order.forEach(generateOrderList);
}

function handleCheckout() {
  modalPaymentEl.showModal();
}

function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior
  if (modalInnerEl.checkValidity()) {
    orderCompleted(); // Only call if the form is valid
  }
}

function orderCompleted() {
  modalPaymentEl.close();
  generateCompletionMessage();
  clearPaymentInput();
}

function getFirstNameCardholder() {
  const fullNameInput = document.querySelector('[name="cardholder-name"]');
  return fullNameInput.value.split(' ')[0];
}

function generateCompletionMessage() {
  orderContainerEl.style.display = 'block';
  orderContainerEl.innerHTML = `
    <div class="cart-closed">  
        <p class="dispatched-message">Thanks, ${getFirstNameCardholder()}!
        <br> Your order is on its way!</p>
        <button class="new-order-btn" id="new-order-btn">New Order</button>
    </div>
    `;
  document.getElementById('new-order-btn').addEventListener('click', newOrder);
}

function clearPaymentInput() {
  modalInnerEl.reset(); // This resets the entire form
}

function reset() {
  orderContainerEl.style.display = 'none';

  orderContainerEl.innerHTML = `
    <h3>Your Order</h3>
    <ul class="shopping-cart"></ul>
    <div class="order order-total"></div>
    <button id="complete-order-btn" aria-label="send order">Complete order</button>
  `;

  shoppingCartEl = document.querySelector('.shopping-cart');
  completeOrderBtn = document.getElementById('complete-order-btn');
  completeOrderBtn.addEventListener('click', handleCheckout);
}

function newOrder() {
  reset(); // This refresh page to start a new order
  order = [];
  orderSum = 0;
}

populateMenuContainer();
