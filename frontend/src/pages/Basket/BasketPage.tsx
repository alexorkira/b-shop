import React, { useEffect, useState } from 'react';
import { CheckoutList } from '../../components/CheckoutList/CheckoutList';
import { CheckoutProduct } from '../../models/CheckoutProduct';
import { CheckoutService } from '../../services/checkout.services';
import ContextStore from '../../store';
import './BasketPage.scss';

export const BasketPage: React.FunctionComponent = () => {
    const [ checkoutList, setCheckoutList ] = useState<Array<CheckoutProduct>>([]);
    const [ total, setTotal ] = useState<number>(0);
    const basket = ContextStore.useStoreState((s) => s.basket.list);
    
    useEffect(() => {
        const checkout = async () => {
            const res = await CheckoutService.checkout(basket);
            setCheckoutList(res.list);
            setTotal(res.total);
        }; 
    
        checkout();
    }, [basket]);

    return (
        <div className='my-basket d-flex flex-row' >
            <CheckoutList 
                list={checkoutList.sort((cp1, cp2) => cp1.sku.localeCompare(cp2.sku))} 
            />
            <div className="total-container d-flex flex-row" >
                <p>Order total:</p>
                <p>{total}€</p>
            </div>
        </div>
    );
};
