import React from 'react';
import { toast } from 'react-toastify';
import { CheckoutProduct } from '../../models/CheckoutProduct';
import ContextStore from '../../store';
import { Icon, IconId } from '../Icon/Icon';
import { Media } from '../Media/Media';
import './CheckoutProductCard.scss';

export interface CheckoutProductCardProps {
    checkoutProduct: CheckoutProduct;
}

export const CheckoutProductCard: React.FunctionComponent<CheckoutProductCardProps> = (
    { checkoutProduct }
) => {
    const addProduct = ContextStore.useStoreActions((a) => a.basket.addProduct);
    const removeProduct = ContextStore.useStoreActions((a) => a.basket.removeProduct)
    const removeAllProducts = ContextStore.useStoreActions((a) => a.basket.removeAllProducts);

    return (
        <div className={`checkout-product-card d-flex flex-row ${checkoutProduct.unitPrice ? '' : 'out-of-date'}`}>
            <Media media={checkoutProduct.media} />
            <div className='container d-flex flex-column justify-content-center'>
                <div className='product-info-container d-flex flex-row'>
                    <span className='product-name'>{checkoutProduct.name ?? `sku ${checkoutProduct.sku}`}</span>
                    {checkoutProduct.unitPrice ?
                        <>
                            <span>{checkoutProduct.description}</span>
                            <span>{checkoutProduct.unitPrice} {checkoutProduct.currency} x unit</span>
                            {checkoutProduct.discount &&
                                <div className="discount">
                                    <Icon 
                                        iconId={IconId.Discount} 
                                        color={"#eac102"} 
                                    />
                                    <span>{checkoutProduct.nbItemsForDiscount}x{checkoutProduct.discount} €</span>
                                </div>
                            }
                            <span>total: {checkoutProduct.total} {checkoutProduct.currency}</span>
                        </> 
                        : <span style={{color:"red", fontWeight:"bold", fontSize:"20px"}}>OUT OF DATE</span>
                    }
                    <Icon 
                        iconId={IconId.Trashcan} 
                        onClick={() => {
                             removeAllProducts(checkoutProduct.sku);
                             toast.success(`Removed ${checkoutProduct.sku} from the basket`); 
                        }}
                        width={18}
                        height={18}
                        color={"red"} 
                    />
                </div>
                {checkoutProduct.unitPrice && 
                    <div className='add-to-basket-container d-flex flex-row'>
                        <Icon 
                            iconId={IconId.Minus} 
                            onClick={() => removeProduct(checkoutProduct.sku)}
                            color={"red"} 
                        />
                        <div className='quantity'>{checkoutProduct.nbProducts}</div>
                        <Icon 
                            iconId={IconId.Plus} 
                            onClick={() => addProduct(checkoutProduct.sku)} 
                            color={"orange"} 
                        />
                    </div>
                }
            </div>
        </div>
    );
};
