import { PAYMENT_METHOD } from "../constants/enum";

export const paymentMethods = [
    { id: 1, name: PAYMENT_METHOD.CASH },
    { id: 2, name: PAYMENT_METHOD.BANK_TRANSFER },
    { id: 3, name: PAYMENT_METHOD.CREDIT_CARD },
    { id: 4, name: PAYMENT_METHOD.DEBIT_CARD },
    { id: 5, name: PAYMENT_METHOD.OTHER }
];