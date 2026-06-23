import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// 1. هذه هي المصفوفة الأصلية (تأكد أنها معرفة مرة واحدة فقط)
export const deliveryOption = [{
        id: '1',
        deliveryDate: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDate: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDate: 1,
        priceCents: 999
    }
];

// 2. دالة لجلب الخيار (تأكد من تمرير ID فقط وعدم استخدام متغيرات خارجية)
export function getDeliveryOption(deliveryOptionID) {
    let deliveryOptionItem;

    deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionID) {
            deliveryOptionItem = option;
        }
    });

    return deliveryOptionItem || deliveryOption[0];
}