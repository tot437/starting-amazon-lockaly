import { renderOrderSummary } from '../utills/checkout/ordersummary.js';
import { renderPaymentSummary } from '../utills/checkout/paymentsummary.js';
import { loadProducts } from '../data/products.js';
import { loadCarts } from '../data/cards.js';
//import '../data/backed-practice.js';
// استيراد كائن cart تحديداً من الملف الذي يحتوي على كود الـ OOP
//import { Cart } from '../data/cart-class.js';
Promise.all([
    new Promise((resolve) => {

        loadProducts(() => {
            resolve();
        });
    }),
    new Promise((resolve) => {
        loadCarts(() => {
            resolve();
        });
    })
]).then((resolve) => {
    renderOrderSummary();
    renderPaymentSummary();
});
/*
new Promise((resolve) => {

    loadProducts(() => {
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCarts((resolve) => {
            resolve();
        });
    });
}).then((resolve) => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/
// تشغيل وظائف الصفحة
/*
loadProducts(() => {
    loadCarts(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/