/* import { cards, removeFromCart } from '../data/cards.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../utills/money.js';
let cardSummaryHTML = '';

cards.forEach((cardItem) => {
    const productId = cardItem.productID;

    function getProductById(productId) {
        return products.find(p => p.id === productId);
    }

    const product = getProductById(productId);

    if (!product) {
        console.log("Invalid product id:", productId);
        return;
    }

    addToCart(product);

    cardSummaryHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
          alt="${matchingProduct.name}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>

          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity:
              <span class="quantity-label">${cardItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary">
              Update
            </span>

            <span
              class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${productId}">

            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>

              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>

          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">

            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>

              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>

          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">

            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>

              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;
/*document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart();

        renderOrderSummary();
    });
});

function renderOrderSummary() {
    let cardSummaryHTML = '';

    cards.forEach((cardItem) => {
        const productId = cardItem.productID;

        const matchingProduct = products.find((product) => {
            return product.id === productId;
        });

        cardSummaryHTML += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}"
            alt="${matchingProduct.name}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>

            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>

            <div class="product-quantity">
              Quantity:
              <span class="quantity-label">${cardItem.quantity}</span>

              <span
                class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${productId}">
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            removeFromCart(productId);

            renderOrderSummary();
        });
    });
}

renderOrderSummary();
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productID = link.dataset.productId;

        removeFromCart(productID);

        const container = link.closest('.cart-item-container');
        container.remove();
    });
}); */
import { cards, removeFromCart } from '../data/cards.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../utills/money.js';

// وضع الكود بالكامل داخل دالة ليعاد تشغيلها وتحديث الصفحة عند الحذف بانتظام
function renderOrderSummary() {
    let cardSummaryHTML = '';

    cards.forEach((cardItem) => {
        const productId = cardItem.productID;

        // البحث عن بيانات المنتج الكاملة من مصفوفة المنتجات
        const matchingProduct = products.find(p => p.id === productId);

        if (!matchingProduct) {
            console.log("Invalid product id:", productId);
            return;
        }

        cardSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${productId}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>

              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>

              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cardItem.quantity}</span>
                </span>

                <span class="update-quantity-link link-primary">
                  Update
                </span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;

    // تفعيل أزرار الحذف بعد طباعة الـ HTML
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            // 1. الحذف من المصفوفة والتخزين في الـ LocalStorage
            removeFromCart(productId);

            // 2. إعادة تشغيل الدالة لتحديث السلة وحذف العنصر تلقائياً من الواجهة وبشكل سليم
            renderOrderSummary();
        });
    });
}

// تشغيل الدالة لأول مرة عند تحميل الصفحة
renderOrderSummary();