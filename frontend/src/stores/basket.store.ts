import { action, Action, persist } from "easy-peasy";

export interface BasketStoreModel {
    list: Array<string>;
    addProduct: Action<BasketStoreModel, string>;
    removeProduct: Action<BasketStoreModel, string>;
    removeAllProducts: Action<BasketStoreModel, string>;
}

export const basketInitState: BasketStoreModel = persist({
    list: [],
    addProduct: action((state, product) => {
        state.list.push(product);
    }),
    removeProduct: action((state, product) => {
        const index = state.list.indexOf(product);
        if (index !== -1) {
            state.list.splice(index, 1);
        }
    }),
    removeAllProducts: action((state, skuToRemove) => {
        state.list = state.list.filter(sku =>  sku !== skuToRemove);
    }),
});