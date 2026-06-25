import { renderOrderSummary } from '../utills/checkout/ordersummary.js';
import { loadFromStorage, cards } from '../data/cards.js';
import { loadProducts } from '../data/products.js';

describe('test suite: render order summary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div> `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                    productID: productId1,
                    quantity: 2,
                    deliveryOptionID: '1'
                },
                {
                    productID: productId2,
                    quantity: 1,
                    deliveryOptionID: '2'
                }
            ]);
        });

        loadFromStorage();
        renderOrderSummary();
    });

    it('displays the cart and handles deletion', () => {
        // إضافة التوقعات (Expectations) داخل الـ it
        expect(document.querySelector('.js-order-summary').innerHTML).not.toEqual('');
        expect(document.querySelector('.js-payment-summary').innerHTML).not.toEqual('');
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cards.length).toEqual(1);
        expect(cards[0].productID).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = ` `;
    });
});