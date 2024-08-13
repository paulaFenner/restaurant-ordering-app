import { menuArray } from './data.js';

const menuContainerEl = document.querySelector('.menu-container');

function populateMenuContainer() {
  for (let menuItem of menuArray) {
    generateMenuHtml(menuItem);
  }
}

function generateMenuHtml(menuItem) {
  menuContainerEl.innerHTML += `
    <section class="menu-item">
        <span class="item-image" >${menuItem.emoji}</span>
        <div class="item-description">
            <h2>${menuItem.name}</h2>
            <p>${menuItem.ingredients}</p>
            <p>$ ${menuItem.price}</p>
        </div>
        <button class="item-add-btn">+</button>
    </section>
      `;
}

populateMenuContainer();
