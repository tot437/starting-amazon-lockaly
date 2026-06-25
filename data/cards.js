// جلب البيانات من الـ LocalStorage أو وضع قيم افتراضية
export let cards;
loadFromStorage();
// حفظ التعديلات

// تحميل آخر حالة من التخزين
export function loadFromStorage() {
    cards = JSON.parse(localStorage.getItem('cards')) || [{
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
}

export function saveToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}
saveToStorage();

// إضافة منتج للسلة (الإصدار 2)
// أضف هذه الدالة في ملف cards.js لتتمكن من استدعائها في الاختبار
export function addToCart(productID) {
    let matchingItem = cards.find(cardItem => cardItem.productID === productID);
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cards.push({
            productID: productID,
            quantity: 1,
            deliveryOptionID: '1'
        });
    }
    saveToStorage();
}







// حذف منتج من السلة باستخدام filter (طريقة آمنة وسريعة)
export function removeFromCart(productID) {
    cards = cards.filter(cardItem => cardItem.productID !== productID);
    saveToStorage();
}

// تحديث خيار التوصيل للمنتج
export function updateDeliveryOption(productID, deliveryOptionID) {
    let matchingItem = cards.find(cardItem => cardItem.productID === productID);
    if (matchingItem) {
        matchingItem.deliveryOptionID = deliveryOptionID;
        saveToStorage();
    }
};

export function loadCarts(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        console.log(xhr.response)
    });
    fun();

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
};