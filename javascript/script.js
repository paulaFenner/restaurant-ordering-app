import { menuArray } from './data.js';

let order = [];
let orderSum = 0;

const menuContainerEl = document.querySelector('.menu-container');
const orderContainerEl = document.querySelector('.order-container');
const completeOrderBtn = document.getElementById('complete-order-btn');
const modalPaymentEl = document.getElementById('modal');
const modalPayBtn = document.querySelector('.modal-pay-btn');

menuContainerEl.addEventListener('click', handleItemSelected);
completeOrderBtn.addEventListener('click', handleCheckout);
modalPayBtn.addEventListener('click', orderCompleted);

function populateMenuContainer() {
  for (let menuItem of menuArray) {
    generateMenuList(menuItem);
  }
}

function generateMenuList(menuItem) {
  menuContainerEl.innerHTML += `
    <section class="menu-item">
        <span class="item-image" >${menuItem.emoji}</span>
        <div class="item-description">
            <h2>${menuItem.name}</h2>
            <p class="item-ingredients">${menuItem.ingredients}</p>
            <p class="price">€ ${menuItem.price}</p>
        </div>
        <button class="item-add-btn" data-id="${menuItem.id}">+</button>
    </section>
      `;
}

function handleItemSelected(e) {
  if (e.target.classList.contains('item-add-btn')) {
    appendOrder(e);
  }
}

function appendOrder(e) {
  const productId = e.target.dataset.id;
  const product = menuArray.filter((item) => item.id === parseInt(productId))[0];
  if (product) {
    order.push(product);
    orderContainerEl.style.display = 'block';
    generateOrderList(product);
  }
}

function generateOrderList(product) {
  document.querySelector('.order-selection').innerHTML += `
    <li class="order-item">
        <h4>${product.name}</h4>
        <button class="remove-btn" id="remove-btn">remove</button>
        <p class="price"><span>€</span>${product.price}</p>
    </li>
     `;

  generateTotalPrice(product);
}

function generateTotalPrice(product) {
  orderSum += product.price;
  document.querySelector('.order-total').innerHTML = `
    <h4>Total price:</h4>
    <p class="price">€${orderSum}</p>
     `;
}

// function removeItemFromOrder() {
//   document.getElementById('remove-btn').addEventListener('click', function () {});
// }

function handleCheckout() {
  modalPaymentEl.style.display = 'block';
}

function getFirstNameCardholder() {
  const fullNameInput = document.querySelector('[name="cardholder-name"]');
  return fullNameInput.value.split(' ')[0];
}

function generateCompletionMessage() {
  orderContainerEl.innerHTML = `
  <h3 class="dispatched-message">Thanks, ${getFirstNameCardholder()}!
  <br> Your order is on its way!</h3>
  <button class="new-order-btn" id="new-order-btn">New Order</button>
  `;
}

function clearPaymentInput() {
  document.querySelector('[name="cardholder-name"]').value = '';
  document.querySelector('[name="card-number"]').value = '';
  document.querySelector('[name="expiration-date"]').value = '';
  document.querySelector('[name="cvv-cvc"]').value = '';
}

function orderCompleted() {
  order = [];
  orderSum = 0;
  modalPaymentEl.style.display = 'none';
  generateCompletionMessage();
  clearPaymentInput();
}

populateMenuContainer();
