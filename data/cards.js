export const card = [{
    productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
}, {
    productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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