import { action, Action, createContextStore } from "easy-peasy";
import { Role, User } from "./models/User";
import { basketInitState, BasketStoreModel } from "./stores/basket.store";
import { discountInitState, DiscountsStoreModel } from "./stores/discounts.store";
import { productInitState, ProductsStoreModel } from "./stores/products.store";

export interface ContextStoreModel {
    user: User | undefined;
    fakeLogin: Action<ContextStoreModel, User>;
    basket: BasketStoreModel;
    products: ProductsStoreModel;
    discounts: DiscountsStoreModel;
}

const defaultUser: User = {
    id: "0",
    name: "Alessandro", 
    role: Role.ADMIN
}

const ContextStore = createContextStore<ContextStoreModel>(
   {
        user: defaultUser,
        fakeLogin : action((state, user) => {
            state.user = user;
        }),
        basket: basketInitState,
        products: productInitState,
        discounts: discountInitState,
    } 
);

export default ContextStore;