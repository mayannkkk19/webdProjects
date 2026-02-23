import {countCartItem, calculateCartPriceCents, calculateShippingPrice} from '../../data/cart.js';

export function renderPaymentSummary () {
    const totalItemPrice = (calculateCartPriceCents()/100).toFixed(2); 
    const totalShippingPrice = (calculateShippingPrice()/100).toFixed(2);
    const totalBeforeTax =0 ;
    const estimatedTax = ((totalBeforeTax/10).toFixed(2));

    const html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${countCartItem()}):</div>
            <div class="payment-summary-money">$${totalItemPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `

    document.querySelector('.js-payment-summary').innerHTML = html;
    console.log(calculateCartPriceCents());
}