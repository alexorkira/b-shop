import React, { useEffect } from 'react';
import { AddNewButton } from '../../components/AddNewButton/AddNewButton';
import { DiscountsTable } from '../../components/DiscountsTable/DiscountsTable';
import { Discount } from '../../models/Discount';
import ContextStore from '../../store';
import './DiscountPage.scss';

export const DiscountPage: React.FunctionComponent = () => {
    const fetchDiscounts = ContextStore.useStoreActions((a => a.discounts.fetchList));
    const setDiscountsList = ContextStore.useStoreActions((a => a.discounts.setList));
    const discountsList = ContextStore.useStoreState((s) => s.discounts.list);
    const fetchProducts = ContextStore.useStoreActions((s) => s.products.fetchList);
    const productsList = ContextStore.useStoreState((s) => s.products.list);

    useEffect(() => {
        fetchDiscounts();
    }, []);

    useEffect(() => {
        if (productsList.length === 0) {
            fetchProducts();
        }
    }, []);
    
    return (
        <div className='discount-page'>
              <AddNewButton 
                label="Add new discount"
                onClick={() =>{
                    const newDiscount = {} as Discount;
                    setDiscountsList([newDiscount].concat(discountsList));
                } }
                media={`${process.env.REACT_APP_MEDIA_HOST}/media/discount.png`}
                alt="add new product"
                doubleImg
            />
            <DiscountsTable 
                discountsList={discountsList} 
                productsList={productsList} 
            />
        </div>
    );
};
