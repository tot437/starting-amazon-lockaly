import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from '../utills/money.js';
import { cards, addToCart } from '../data/cards.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    let productsHTML = '';
    // تم تغيير التسمية من products إلى product منعاً للتشويش
    products.forEach((product) => {
        productsHTML = productsHTML + `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${product.image}" alt="product image">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars" src="${product.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
            ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png"> Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" 
             data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>  
 `;

    });

    // تأكد من الحروف الإملائية لـ products في ملف الـ HTML الخاص بك
    // 1. تعريف المتغير أولاً (تأكد من كتابة الاسم بدقة)
    const productGrid = document.querySelector('.js-products-grid') || document.querySelector('.js-prodocts-grid');

    // 2. التحقق من وجود العنصر في الصفحة ثم حقن الكود بداخله
    if (productGrid) {
        productGrid.innerHTML = productsHTML;
    }

    function upDateCardQuantity() {
        let cardQuantity = 0;
        cards.forEach((cardItem) => {
            cardQuantity += cardItem.quantity;
        });

        const quantityElement = document.querySelector('.js-card-quantity');
        if (quantityElement) {
            quantityElement.innerHTML = cardQuantity;
        }
    }

    // تشغيل الدالة فور تحميل الصفحة ليظهر عدد المنتجات الحالي بالسلة
    upDateCardQuantity();

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            // الـ dataset تقرأ الكلمات بـ camelCase (product-id تصبح productId)
            const productID = button.dataset.productId;
            addToCart(productID);
            upDateCardQuantity();
        });
    });
}