import { cards } from '../../data/cards.js';
import { products, getProduct } from '../../data/products.js'; // أو المسار الصحيح حسب هيكلة مجلداتك
import { getDeliveryOption } from '../../data/deliveryoption.js';
import { formatCurrency } from '../money.js';
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cards.forEach((cardItem) => {
        const product = getProduct(cardItem.productID);

        if (product) {
            productPriceCents += product.priceCents * cardItem.quantity;
        }
        // قمنا بحذف الـ else والـ console.warn هنا
        // لأننا لا نحتاج لإظهار تحذير في الـ Console طالما أن البرنامج يحسب السعر بشكل صحيح
        const deliveryOption = getDeliveryOption(cardItem.deliveryOptionID);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxeCents = productPriceCents + shippingPriceCents;
    const taxeCents = totalBeforeTaxeCents * 0.1;
    const totalCents = totalBeforeTaxeCents + taxeCents;

    const paymentSummaryHTML = `
      <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (3):</div>
                    <div class="payment-summary-money">
                    $${formatCurrency(productPriceCents)}
                    </div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">
                    $${formatCurrency(shippingPriceCents)}
                    </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxeCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">
                   $${formatCurrency(taxeCents)}
                    </div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">
                    $${formatCurrency(totalCents)}
                    </div>
                </div>

                <button class="place-order-button button-primary js-place-order">
						Place your order
					</button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order').addEventListener('click', async() => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });

            const order = await response.json();
            addOrder(order);
            window.location.href = 'orders.html';
        } catch (error) {
            console.log('Unexpected error. Try again later.');
        }
    })
};