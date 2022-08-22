
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../atoms/Button/Button';
import { Dialog } from '../../atoms/Dialog/Dialog';
import { Input } from '../../atoms/Input/Input';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.services';
import ContextStore from '../../store';
import './NewProductDialog.scss';

export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface NewProductDialogProps {
    dialogOpen: boolean;
    setDialogOpen: (show: boolean) => void;
}
export const NewProductDialog: React.FunctionComponent<NewProductDialogProps> = (
    props: NewProductDialogProps
) => {
    const [ sku, setSku ] = useState<string>('');
    const [ name, setName ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const [ price, setPrice ] = useState<string>("0.01");
    const addProduct = ContextStore.useStoreActions((a) => a.products.add);

    const addNew = async () => {
        const product = { 
            sku: sku.toUpperCase(),
            name, 
            description,
            unitPrice: parseFloat(price),
            currency: "eur"
        };
        ProductsService.addNew(product)
            .then(() => {
                setTimeout(()=> {
                    props.setDialogOpen(false);
                    setSku("");
                    setName("");
                    setDescription("");
                    setPrice("0.01");
                }, 700);
                toast.success(`New product stored`); 
                addProduct(product as Product);
            })
            .catch(e => {
                //TODO: Handle the error in order to explain to the user what's happened on the backend
                toast.error(`Failed to add new product. ${e.data.message ?? 'undefined error'}`);
            });
    }; 

    return (
        <Dialog
            class={"new-product-dialog"}
            show={props.dialogOpen}
            setShow={props.setDialogOpen}
            title={'Add new product'}
            style={{ backgroundImage: 
                `linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,0)), 
                    url(${process.env.REACT_APP_MEDIA_HOST}/media/add-to-shop.png)`
            }}
        >
            <div className="new-product-container d-flex flex-column">
                <Input key="sku" label='SKU' value={sku} onChange={setSku} />
                <Input key="name" label='Name' value={name} onChange={setName} />
                <Input 
                    key="desciption" 
                    label='Description' 
                    value={description} onChange={setDescription} />
                <div className='price-container'>
                    <Input 
                        key="price" 
                        label='price' 
                        type='number' 
                        value={price} onChange={setPrice}
                        inputProps={{ min: "0.01", step: "any" }} 
                    />
                    <div className='currency'>€</div>
                </div>
            </div>
            <Button
                styleClass={"w-100"}
                label="Store" 
                disabled={!(sku && name && price)} 
                setClick={addNew}
            />
        </Dialog>
    );
};

