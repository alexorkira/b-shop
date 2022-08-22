import React from 'react';
import { CheckoutProductCard } from '../../atoms/CheckoutProductCard/CheckoutProductCard';
import { CheckoutProduct } from '../../models/CheckoutProduct';
import './CheckoutList.scss';

interface CheckoutListProps {
    list: Array<CheckoutProduct>;
}

export const CheckoutList: React.FunctionComponent<CheckoutListProps> = (
    { list }
) => {
    return (
        <div className='checkout-product-container d-flex flex-column'>
            {list.map((checkoutProduct: CheckoutProduct) => 
                <CheckoutProductCard 
                    key={checkoutProduct.sku}
                    checkoutProduct={checkoutProduct}
                />
            )}
        </div>
    );
};
