import { renderOrderSummary } from '../utills/checkout/ordersummary.js';
import { renderPaymentSummary } from '../utills/checkout/paymentsummary.js';
// استيراد كائن cart تحديداً من الملف الذي يحتوي على كود الـ OOP
//import { Cart } from '../data/cart-class.js';

// تشغيل وظائف الصفحة
renderOrderSummary();
renderPaymentSummary();