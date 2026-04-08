import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import {} from '../data/backend-practice.js';

loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
