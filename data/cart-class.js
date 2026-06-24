export class Cart {
    localStorageKey;
    cardsItems;
    constructor(loadFromStorageKey) {
        this.loadFromStorage();

        this.loadFromStorageKey = loadFromStorageKey;

    }



    loadFromStorage() {
        const raw = localStorage.getItem(this.localStorageKey);
        try {
            this.cardsItems = raw ? JSON.parse(raw) : [];
        } catch (e) {
            this.cardsItems = [];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cardsItems));
    }

    addToCart(productID) {
        let matchingItem = this.cardsItems.find(cardItem => cardItem.productID === productID);
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cardsItems.push({ productID: productID, quantity: 1, deliveryOptionID: '1' });
        }
        this.saveToStorage();
    }

    removeFromCart(productID) {
        this.cardsItems = this.cardsItems.filter(cardItem => cardItem.productID !== productID);
        this.saveToStorage();
    }

    updateDeliveryOption(productID, deliveryOptionID) {
        let matchingItem = this.cardsItems.find(cardItem => cardItem.productID === productID);
        if (matchingItem) {
            matchingItem.deliveryOptionID = deliveryOptionID;
            this.saveToStorage();
        }
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-bussines');



console.log(cart);
console.log(businessCart);