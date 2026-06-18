let productsHTML = '';

products.forEach((products) => {
    productsHTML = productsHTML + `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${products.image}" alt="Black and gray athletic cotton socks">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars" src="images/ratings/rating-${products.rating.stars * 10}.png" alt="4.5 out of 5 stars">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              $ ${(products.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png" alt="Added to cart">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
             data-product-id="${products.id}" >
              Add to Cart
            </button>
          </div>  
 `;

});


document.querySelector('.js-prodocts-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productsID = button.dataset.productID;
        let matchingItem;
        card.forEach((item) => {
            if (productsID === item.productID) {
                matchingItem = item;
            }

            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {

                card.push({
                    productsID: productsID,
                    quantity: 1
                })
            }
        });
    });
    console.log(card);
});