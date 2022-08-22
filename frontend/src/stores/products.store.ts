import { action, Action, thunk, Thunk } from "easy-peasy";
import { Product } from "../models/Product";
import { ProductsService } from "../services/products.services";

export interface ProductsStoreModel {
    list: Array<Product>;
    fetchList: Thunk<ProductsStoreModel>;
    setList: Action<ProductsStoreModel, Array<Product>>;
    add: Action<ProductsStoreModel, Product>;
    remove: Action<ProductsStoreModel, string>;
}

export const productInitState: ProductsStoreModel = {
    list: [],
    fetchList: thunk(async(actions) => {
        const res = await ProductsService.getAll();
        actions.setList(res);
    }),
    setList: action((state, list) => {
        state.list = list;
    }),
    add: action((state, product) => {
        state.list.push(product);
    }),
    remove: action((state, sku) => {
        const index = state.list.findIndex(p => p.sku === sku);
        if (index) {
            state.list.splice(index, 1);
        }
    })
};