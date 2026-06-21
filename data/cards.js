export const card = [];

export function addToCard(productID) {
    let matchingItem;

    card.forEach((cardItem) => {
        if (cardItem.productID === productID) {
            matchingItem = cardItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        card.push({
            productID: productID,
            quantity: 1
        });
    }
}