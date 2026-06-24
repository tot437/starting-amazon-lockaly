import { cards, loadFromStorage, addToCart, updateDeliveryOption } from '../data/cards.js';

describe('test suite: add to cart', () => {
    it('add existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                DeliveryOptionID: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cards.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cards[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cards[0].quantity).toEqual(2);
    });
    // هذه الخطوة تضمن إفراغ المصفوفة قبل كل اختبار ليبدأ الاختبار من الصفر
    beforeEach(() => {
        // إذا كانت المصفوفة تعتمد على كائن، تأكد من تنظيفها
        cards.length = 0;
    });

    it('add existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
    });

    it('add new product to the cart', () => {
        // 1. التجسس على localStorage
        spyOn(localStorage, 'setItem');

        // 2. استدعاء الدالة
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // 3. التحقق من أن الطول أصبح 1
        expect(cards.length).toEqual(1);

        // 4. التحقق من أن setItem تم استدعاؤها مرة واحدة
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // 5. التحقق من صحة بيانات المنتج داخل المصفوفة
        expect(cards[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cards[0].quantity).toEqual(1);
    });
});