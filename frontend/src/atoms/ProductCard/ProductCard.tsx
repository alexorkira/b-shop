import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Discount } from '../../models/Discount';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.services';
import ContextStore from '../../store';
import { Button } from '../Button/Button';
import { Icon, IconId } from '../Icon/Icon';
import { Media } from '../Media/Media';
import './ProductCard.scss';

export interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FunctionComponent<ProductCardProps> = (
    props: ProductCardProps
) => {
    const [ product ] = useState<Product>(props.product);
    const [ quantity, setQuantity ] = useState<number>(0);
    const [ discount, setDiscount ] = useState<Discount>();
    const discountsList = ContextStore.useStoreState((s) => s.discounts.list);
    const addProduct = ContextStore.useStoreActions((a) => a.basket.addProduct);
    const removeProduct = ContextStore.useStoreActions((a) => a.products.remove);

    useEffect(() => {
        setDiscount(discountsList.find((d) => 
            d.sku === product.sku)
        );
    }, [discountsList, product.sku])

    const handleQuantity = (event: any) => {
        const value = Number(event.target.value);
        setQuantity(!Number.isNaN(value) ? value : 0);
    }

    const deleteProduct = async () => {
        ProductsService.remove(product.sku)
            .then(() => {
                toast.success(`Removed ${product.sku} from the shop`)
                removeProduct(product.sku);
            })
            .catch(e => console.error(e));
    }

    return ( 
        <div className='product-card d-flex flex-row'>
            <Media media={product.media ?? "/media/no-media.png"} />
            <div className='container d-flex flex-column'>
                <Icon 
                    iconId={IconId.Trashcan} 
                    onClick={deleteProduct}
                    width={18}
                    height={18}
                    color={"red"} 
                />
                <div className='product-info-container d-flex flex-column'>
                    <span className='sku'>SKU: {product.sku}</span>
                    <span className='product-name'>{product.name}</span>
                    <span className='product-price' >
                        {product.unitPrice} {product.currency === "eur" ? '€' : product.currency}
                    </span>
                    <span>{product.description}</span>
                    {discount && 
                        <div className="discount">
                            <Icon 
                                iconId={IconId.Discount} 
                                color={"#eac102"} 
                            />
                            <span>{discount.nbItems}x{discount.discount} €</span>
                        </div>
                    }
                </div>
                <div className='add-to-basket-container d-flex flex-row'>
                    <input className='quantity' value={quantity} onChange={handleQuantity} />
                    <Icon 
                        iconId={IconId.Plus} 
                        width={32}
                        height={32}
                        onClick={() => setQuantity(quantity+1)} 
                        color={"orange"} 
                    />
                    <Button 
                        label="Add" 
                        disabled={!quantity} 
                        icon={{id: IconId.Basket }}
                        setClick={() => {
                            for(let i = 0; i < quantity; i++) {
                                addProduct(product.sku);
                            }
                            toast.success(`Added ${quantity} x ${product.name} to the basket`); 
                            setQuantity(0);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
