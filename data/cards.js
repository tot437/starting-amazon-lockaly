/* export let cards = JSON.parse(localStorage.getItem('cards'));
if (!cards) {
    cards = [{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    }, {
        productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}

export function saveToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

export function addToCart(productID) {
    let matchingItem;

    cards.forEach((cardItem) => {
        if (cardItem.productID !== productID) {
            newCart.push(cardItem);
        }
    });

    cards.length = 0;
    cards.push(...newCart);

    saveToStorage();
};
export function removeFromCart(productId) {
    const newCart = [];

    cards.forEach((cardItem) => {
        if (cardItem.productID !== productId) {
            newCart.push(cardItem);
        }
    });

    cards.length = 0;
    cards.push(...newCart);

    saveToStorage();
} */

/* export let cards = JSON.parse(localStorage.getItem('cards'));

if (!cards) {
    cards = [{
            productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2
        },
        {
            productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1
        }
    ];
}

export function saveToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

export function addToCart(productID) {
    let matchingItem;

    cards.forEach((cardItem) => {
        if (cardItem.productID === productID) {
            matchingItem = cardItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cards.push({
            productID: productID,
            quantity: 1
        });
    }

    saveToStorage();
}

export function removeFromCart(productID) {
    const newCards = [];

    cards.forEach((cardItem) => {
        if (cardItem.productID !== productID) {
            newCards.push(cardItem);
        }
    });

    cards.length = 0;
    cards.push(...newCards);

    saveToStorage();
}*/
// استرجاع البيانات والتأكد من أنها مصفوفة
export let cards = JSON.parse(localStorage.getItem('cards'));

if (!cards) {
    cards = [{
            productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2
        },
        {
            productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1
        }
    ];
}

export function saveToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

export function addToCart(productID) {
    let matchingItem;

    cards.forEach((cardItem) => {
        if (cardItem.productID === productID) {
            matchingItem = cardItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cards.push({
            productID: productID,
            quantity: 1
        });
    }

    saveToStorage();
}

export function removeFromCart(productID) {
    // استخدام filter لتصفية المصفوفة وحذف المنتج المطلوب بشكل آمن
    const newCards = cards.filter(cardItem => cardItem.productID !== productID);

    // تحديث المصفوفة الأصلية
    cards.length = 0;
    cards.push(...newCards);

    saveToStorage();
}