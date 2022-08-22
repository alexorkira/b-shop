import React, { useEffect, useState } from 'react';
import { AddNewButton } from '../../components/AddNewButton/AddNewButton';
import { NewProductDialog } from '../../components/NewProductDialog/NewProductDialog';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import ContextStore from '../../store';
import './ShopPage.scss';

export const ShopPage: React.FunctionComponent = () => {
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const fetchDiscounts = ContextStore.useStoreActions((a => a.discounts.fetchList));
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
        <div className='my-shop-page'>
            <AddNewButton 
                label="Add new product"
                onClick={() => setDialogOpen(true)}
                media={`${process.env.REACT_APP_MEDIA_HOST}/media/box.webp`}
                alt="add new product"
                doubleImg
            />
            <ProductsList 
                productsList={productsList}
            />
            <NewProductDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </div>
    );
};
