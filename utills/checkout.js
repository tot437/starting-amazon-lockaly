import { renderOrderSummary } from '../utills/checkout/ordersummary.js';
import { renderPaymentSummary } from '../utills/checkout/paymentsummary.js';
// استيراد كائن cart تحديداً من الملف الذي يحتوي على كود الـ OOP
import { Cart } from '../data/cartoop.js';

// تشغيل وظائف الصفحة
renderOrderSummary();
renderPaymentSummary();

// طباعة الكائن للتأكد من أنه يعمل ومحمل بالبيانات في الكونسول
console.log(cart);