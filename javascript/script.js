import { menuArray } from './data.js';

const menuContainerEl = document.querySelector('.menu-container');
const orderContainerEl = document.querySelector('.order-container');

function populateMenuContainer() {
  for (let menuItem of menuArray) {
    generateMenuHtml(menuItem);
    // generateOrderHtml(menuItem);
  }
}

function generateMenuHtml(menuItem) {
  menuContainerEl.innerHTML += `
    <section class="menu-item">
        <span class="item-image" >${menuItem.emoji}</span>
        <div class="item-description">
            <h2>${menuItem.name}</h2>
            <p class="item-ingredients">${menuItem.ingredients}</p>
            <p class="price">€ ${menuItem.price}</p>
        </div>
        <button class="item-add-btn">+</button>
    </section>
      `;
}

// function generateOrderHtml(menuItem) {
//   orderContainerEl.innerHTML += `
//     <h3>Your Order</h3>
//     <ul class="order">
//         <li class="order-item">
//             <p>${menuItem.name}</p>
//             <button class="remove-btn" id="remove-btn">remove</button>
//             <p><span>€</span> ${menuItem.price}</p>
//         </li>
//     </ul>
//     <div class="order">
//         <p>Total to pay:</p>
//         <p>€xx</p>
//     </div>
//     <button>Complete order</button>
//     `;
// }

populateMenuContainer();
