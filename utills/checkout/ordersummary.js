import { cards, removeFromCart, updateDeliveryOption } from '../../data/cards.js';
import { products, getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOption, getDeliveryOption } from '../../data/deliveryoption.js';
import { formatCurrency } from '../money.js';
import { renderPaymentSummary } from './paymentsummary.js';
export function renderOrderSummary() {
    let cartSummaryHTML = '';

    // دالة توليد خيارات التوصيل
    function deliveryOptionHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOption.forEach((option) => {
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} Shipping`;
            const isChecked = option.id === cartItem.deliveryOptionID;

            html += `
                <div class="delivery-option">
                  <input
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${option.id}"
                    type="radio"
                    class="delivery-option-input js-delivery-option"
                    name="delivery-option-${cartItem.productID}"
                    ${isChecked ? 'checked' : ''}
                  >
                  <div>
                    <div class="delivery-option-date">${dayString}</div>
                    <div class="delivery-option-price">${priceString}</div>
                  </div>
                </div>
            `;
        });
        return html;
    }

    // بناء محتوى السلة
    cards.forEach((cartItem) => {
        const productId = cartItem.productID;
        const matchingProduct = getProduct(productId);

        if (!matchingProduct) return;

        const selectedOption = getDeliveryOption(cartItem.deliveryOptionID);
        const today = dayjs();
        const deliveryDate = today.add(selectedOption.deliveryDate, 'days');
        const dayString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">Delivery date: ${dayString}</div>
            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">
              <div class="cart-item-details">
                <div class="product-name">${matchingProduct.name}</div>
                <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                  <span class="update-quantity-link link-primary">Update</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">Delete</span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">Choose a delivery option:</div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
        `;
    });

    // تحديث الصفحة
    const orderSummaryElement = document.querySelector('.js-order-summary');
    if (orderSummaryElement) {
        orderSummaryElement.innerHTML = cartSummaryHTML;
        renderPaymentSummary();
    }

    // تفعيل الأزرار
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.onclick = () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderPaymentSummary();
            renderOrderSummary();
        };
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.onclick = () => {
            const productId = element.dataset.productId;
            const deliveryOptionID = element.dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionID);
            renderOrderSummary();
            renderPaymentSummary();
        };
    });
}