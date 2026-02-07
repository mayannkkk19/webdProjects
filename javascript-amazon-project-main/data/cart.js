export const cart = [];

export function addToCart(productId){
  const selectedQuantity = document.querySelector(`.js-product-quantity-selector-${productId}`);
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(selectedQuantity.value);
  } else {
    cart.push({ productId, quantity: Number(selectedQuantity.value)});
  }
}