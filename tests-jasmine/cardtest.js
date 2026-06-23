import { cards, loadFromStorage, addToCart } from '../data/cards.js';

describe('test suite: add to cart', () => {
    it('add existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        // استدعاء الدالة المصححة
        // يجب أن يكون الطول 1 بعد الإضافة
    });

    it('add new product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cards.length).toEqual(1);

    });
});