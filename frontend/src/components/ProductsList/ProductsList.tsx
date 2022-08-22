import React from 'react';
import { ProductCard } from '../../atoms/ProductCard/ProductCard';
import { Product } from '../../models/Product';
import './ProductsList.scss';

interface ProductListProps {
    productsList: Array<Product>;
}

export const ProductsList: React.FunctionComponent<ProductListProps> = (
    props: ProductListProps
) => {
    return (
        <div className='products-container d-flex flex-wrap'>
            {props.productsList.map((product: Product) => 
                <ProductCard key={product.sku} product={product} />
            )}
        </div>
    );
};
