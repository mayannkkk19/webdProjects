import {cart, removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {countCartItem, updateDeliveryOption} from '../data/cart.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

renderCheckoutItem();

function updateCheckoutItemCount() {
    const itemCount = countCartItem();
    document.querySelector('.js-cart-items').innerHTML = `${itemCount} items`;
}

updateCheckoutItemCount();

function renderCheckoutItem(){
    let cartSummaryHTML = '';
    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

        let matchingProduct;
        products.forEach((product)=>{
            if(product.id === productId){
                matchingProduct = product;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('MMMM, dddd D');

        const html = `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: ${deliveryDate}
                    </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src=${matchingProduct.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input quantity-input-for-${matchingProduct.id}" type="text"></input>
                    <span class="save-quantity-link link-primary" data-save-quantity-link ="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}   
                </div>
                </div>
            </div>
        `
        cartSummaryHTML += html;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}

function deliveryOptionsHTML (matchingProduct, cartItem) {
    let deliveryHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('MMMM, dddd D');
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        const html = `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
             data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-for-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                        ${
                            deliveryOption.priceCents === 0 
                            ? 'FREE '
                            : `$${formatCurrency(deliveryOption)} - ` 
                        }Shipping
                    </div>
                </div>
            </div>
        `
        deliveryHTML += html;
    });

    return deliveryHTML;
}

document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCheckoutItemCount();
        });
    });

document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            productContainer.classList.add('is-editing-quantity');
        });
    });

document.querySelectorAll('.save-quantity-link')
    .forEach((saveLink)=>{
        saveLink.addEventListener('click', () => {
            const productId = saveLink.dataset.saveQuantityLink;
            const saveLinkContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            let quantityToSave = Number(document.querySelector(`.quantity-input-for-${productId}`).value);
            if(quantityToSave < 1 || quantityToSave > 1000){
                alert('Please enter a valid quantity!');
                quantityToSave = 0;
            }
            updateQuantity(productId, quantityToSave);
            saveLinkContainer.classList.remove('is-editing-quantity');
            document.querySelector(`.js-quantity-label-${productId}`).innerText = quantityToSave;
            updateCheckoutItemCount();
        });
    });

document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCheckoutItem();
        });
    });
