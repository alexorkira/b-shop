import { action, Action, thunk, Thunk } from "easy-peasy";
import { Discount } from "../models/Discount";
import { DiscountsService } from "../services/discounts.service";

export interface DiscountsStoreModel {
    list: Array<Discount>;
    fetchList: Thunk<DiscountsStoreModel>;
    setList: Action<DiscountsStoreModel, Array<Discount>>;
    add: Action<DiscountsStoreModel, Discount>;
    update: Action<DiscountsStoreModel, Discount>;
    remove: Action<DiscountsStoreModel, number>;
}

export const discountInitState: DiscountsStoreModel = {
    list: [],
    fetchList: thunk(async(actions) => {
        const res = await DiscountsService.getAll();
        //The list will be ordered by creation date (desc)
        actions.setList(res.sort((d1,d2) => d2.createdAt.localeCompare(d1.createdAt)));
    }),
    setList: action((state, list) => {
        state.list = list;
    }),
    add: action((state, discount) => {
        state.list.push(discount);
    }),
    update: action((state, discountUpdated) => {
        const d = state.list.find(d => d.id === discountUpdated.id);
        if (d) {
            Object.assign(d, { ...discountUpdated}); 
        }

    }),
    remove: action((state, index) => {
        state.list.splice(index, 1);
    }),
   
};