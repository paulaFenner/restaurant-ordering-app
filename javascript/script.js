import { menuArray } from './data.js';

let order = [];
let orderSum = 0;

const menuContainerEl = document.querySelector('.menu-container');
const orderContainerEl = document.querySelector('.order-container');
const completeOrderBtn = document.getElementById('complete-order-btn');
const modalInner = document.getElementById('modal-inner'); // Ensure this form element is selected
const modalPaymentEl = document.getElementById('modal');
const modalPayBtn = document.querySelector('.modal-pay-btn');

menuContainerEl.addEventListener('click', handleItemSelected);
completeOrderBtn.addEventListener('click', handleCheckout);
modalPayBtn.addEventListener('click', handleFormSubmission);
orderContainerEl.addEventListener('click', removeItemFromOrder);

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
        <button class="item-add-btn" data-id="${menuItem.id}" aria-label="add item">+</button>
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
        <button class="remove-btn" data-id="${product.id}"  id="remove-btn" aria-label="remove item">remove</button>
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

function removeItemFromOrder(e) {
  if (e.target.classList.contains('remove-btn')) {
    const productId = parseInt(e.target.dataset.id);
    const productIndex = order.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      // Update the total price
      orderSum -= order[productIndex].price;
      document.querySelector('.order-total .price').textContent = `€${orderSum}`;

      // Remove the item from the order array
      order.splice(productIndex, 1);

      // Remove the item from the DOM
      e.target.closest('.order-item').remove();

      // Hide the order container if no items are left
      if (order.length === 0) {
        orderContainerEl.style.display = 'none';
      }
    }
  }
}

function handleCheckout() {
  modalPaymentEl.showModal();
}

function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior
  if (modalInner.checkValidity()) {
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
  <h3 class="dispatched-message">Thanks, ${getFirstNameCardholder()}!
  <br> Your order is on its way!</h3>
  <button class="new-order-btn" id="new-order-btn">New Order</button>
  `;
  appendEventToNewOrderBtn();
}

function appendEventToNewOrderBtn() {
  const newOrderBtn = document.getElementById('new-order-btn');
  if (newOrderBtn) {
    newOrderBtn.addEventListener('click', newOrder);
  }
}

function clearPaymentInput() {
  modalInner.reset(); // This resets the entire form
}

function newOrder() {
  order = [];
  orderSum = 0;
  orderContainerEl.style.display = 'none';
}

populateMenuContainer();
