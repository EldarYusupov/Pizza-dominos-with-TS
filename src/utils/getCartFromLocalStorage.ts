import {calcTotalPrice} from "./calcTotalPrice.ts";

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items,
        totalPrice
    }
}