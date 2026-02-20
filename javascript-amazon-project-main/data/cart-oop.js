const cart = {
    cartItems: undefined,

    loadFromStorage() { 
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    },

    saveToStorage() {
        lStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    addToCart(productId){
        const selectedQuantity = document.querySelector(`.js-product-quantity-selector-${productId}`);
        let matchingItem;
        this.CartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
            matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += Number(selectedQuantity.value);
        } else {
            this.cartItems.push({productId, quantity: Number(selectedQuantity.value), deliveryOptionId: '1'});
        }
        this.saveToStorage();
    }
};

loadFromStorage();

export function countCartItem() {
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem)=>{
    if(cartItem.productId == productId){
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function calculateCartPriceCents() {
  let totalPrice = 0;
  let shippingPrice = 0;
  
  let matchingProductId;

  cart.forEach((cartItem) => {
    matchingProductId = cartItem.productId;
    shippingPrice += matchingProductId.

    products.forEach((product) =>  {
      if(product.id === matchingProductId){
        totalPrice += (product.priceCents) * (cartItem.quantity);
      }
    });

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPrice += deliveryOption.priceCents;
  });
  return totalPrice;
}