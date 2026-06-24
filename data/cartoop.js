export function Cart(localStorageKey) {
    const cart = {
        // جلب البيانات من الـ LocalStorage أو وضع قيم افتراضية
        cardsItems: undefined,

        // تحميل آخر حالة من التخزين
        loadFromStorage: function() {
            this.cardsItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                    productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionID: '1'
                },
                {
                    productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionID: '2'
                }
            ];
        },

        saveToStorage: function() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cardsItems));
        },

        addToCart(productID) {
            let matchingItem = this.cardsItems.find(cardItem => cardItem.productID === productID);
            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cardsItems.push({
                    productID: productID,
                    quantity: 1,
                    deliveryOptionID: '1'
                });
            }
            this.saveToStorage();
        },

        // تصحيح: تم تغيير this.filter إلى this.cardsItems.filter
        removeFromCart(productID) {
            this.cardsItems = this.cardsItems.filter(cardItem => cardItem.productID !== productID);
            this.saveToStorage();
        },

        updateDeliveryOption(productID, deliveryOptionID) {
            let matchingItem = this.cardsItems.find(cardItem => cardItem.productID === productID);
            if (matchingItem) {
                matchingItem.deliveryOptionID = deliveryOptionID;
                this.saveToStorage();
            }
        }
    };

    // تصحيح: يجب إرجاع كائن cart وليس الدالة Cart نفسها
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-bussines');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);