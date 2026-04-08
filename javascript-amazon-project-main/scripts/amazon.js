import {cart, addToCart} from "../data/cart.js"
import {products} from "../data/products.js"

let displayHTML = '';

for (let i = 0; i < products.length; i++){
  const html = `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${products[i].image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${products[i].name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products[i].rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${products[i].rating.count}
        </div>
      </div>

      <div class="product-price">
        $${((products[i].priceCents) / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${products[i].id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-${products[i].id}-added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-product-name="${products[i].name}" data-id="${products[i].id}" data-product-image="${products[i].image}" data-product-price="${products[i].priceCents}" data-product-quantity="1" data-product-id ="${products[i].id}">
        Add to Cart
      </button>
    </div>
  `;
  displayHTML += html;
}

document.querySelector('.products-grid').innerHTML = displayHTML;

function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.productQuantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

let iconTimeout;
let prevId;

function showAddedIcon (productId) {
  prevId = productId;
  if(productId === prevId){
    clearTimeout(iconTimeout);
  }
  const addedToCart = document.querySelector(`.js-${productId}-added-to-cart`);
      
  addedToCart.classList.add(`added-to-cart-pressedfor`);

  iconTimeout = setTimeout(()=>{
    addedToCart.classList.remove('added-to-cart-pressedfor');
  }, 2000);
}
 
document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', ()=>{
      const {productId} = button.dataset;
      const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      

      addToCart(productId, productQuantity);

      updateCartQuantity();

      showAddedIcon(productId);
    });
});


