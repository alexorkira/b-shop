import { Input, Select, TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Discount } from '../../models/Discount';
import { Product } from '../../models/Product';
import { DiscountsService } from '../../services/discounts.service';
import ContextStore from '../../store';
import { Icon, IconId } from '../Icon/Icon';
import './DiscountRow.scss';

export interface DiscountRowProps {
    discount: Discount;
    productsList: Array<Product>;
    deleteAction: (id: string) => void;
    isNew: boolean;
}

export const DiscountRow: React.FunctionComponent<DiscountRowProps> = (
    props: DiscountRowProps
) => {
    const updateDiscountStore = ContextStore.useStoreActions((a => a.discounts.update));
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false);
    const [ discount, setDiscount ] = useState<number>(0.01);
    const [ nbItems, setNbItems ] = useState<number>(2);
    const [ description, setDescription ] = useState<string>('');
    const [ createdAt, setCreatedAt ] = useState<string>('');
    const [ id, setId ] = useState<string>(props.discount.id);
    const [ sku, setSku ] = useState<string>(props.discount.sku);
    const [ isNew, setIsNew ] = useState<boolean>(props.isNew);

    useEffect(() => {
        setIsUpdating(false);
        setDiscount(props.discount.discount ?? 0.01);
        setNbItems(props.discount.nbItems ?? 2);
        setDescription(props.discount.description ?? '');
        setSku(props.discount.sku ?? props.productsList[0].sku);
        setIsNew(props.isNew);
        setCreatedAt(props.discount.createdAt);
        setId(props.discount.id);
    }, [props.discount, props.isNew, props.productsList]);

    const renderCell = (value: string | number, setState: any)  => {
        return (
            (isUpdating || isNew)
                ? <input 
                    value={value} 
                    onChange={(event:any) => setState(event.target.value)} 
                /> 
                : value
        );
    }

    const renderProductField = () => {
        return (isUpdating || isNew)
            ? <Select
                native
                value={sku}
                className="w-100"
                onChange={(event: any) => setSku(event.target.value)}
                input={<Input />}
            >
                {props.productsList
                    .sort((a, b) => a.sku.localeCompare(b.sku))
                    .map((field, index) => (
                        <option
                            key={`select-${id}-option-${index}`}
                            id={`select-menu-item-${index}`}
                            label={`${field.sku} - ${field.name}`}
                            value={field.sku}
                        />
                    )
                )}
            </Select>
            : `${sku} - ${props.productsList.find(p => p.sku === sku)?.name}`
        ;
    }

    const renderActionsField = () => {
        if (isNew) {
            return ( 
                <Icon 
                    iconId={IconId.Save} 
                    onClick={() => addNewDiscount()} 
                    width={16}
                    height={16}
                    color={"#403535"} 
                />
            );
        }

        return (
            <>
                {isUpdating
                    ? <Icon 
                        iconId={IconId.Save} 
                        onClick={() => updateDiscount(id)} 
                        width={16}
                        height={16}
                        color={"#403535"} 
                    />
                    : <Icon 
                        iconId={IconId.Pen} 
                        onClick={() => setIsUpdating(true)} 
                        width={18}
                        height={18}
                        color={"grey"} 
                    />
                }
                <Icon 
                    iconId={IconId.Trashcan} 
                    onClick={() => props.deleteAction(id)} 
                    width={18}
                    height={18}
                    color={"orangered"} 
                />
            </>
        );
    }

    const addNewDiscount = async () => {
        const newRule = { discount, nbItems, description, sku };
        await DiscountsService.addNew(newRule)
            .then((discount) => {
                setCreatedAt(discount.createdAt);
                setId(discount.id);
                toast.success(`Created new rule successfully`); 
                setIsNew(false)}
            )
            .catch(e => {
                //TODO: Handle the error in order to explain to the user what's happened on the backend
                toast.error(`Failed to add new product. ${e.data.message ?? 'undefined error'}`);
            });
    }

    const updateDiscount = async (id: string) => {
        const rule = { id, discount, nbItems, description, sku };
        await DiscountsService.updateRule(rule)
            .then(() => {
                toast.success(`Updated rule successful`); 
                updateDiscountStore(rule as Discount);
                setIsUpdating(false)}
            )
            .catch(e => {
                //TODO: Handle the error in order to explain to the user what's happened on the backend
                toast.error(`Failed to update the product. ${e.data.message ?? 'undefined error'}`);
            });
    }
    
    return (
        <TableRow>
            <TableCell>{renderCell(discount, setDiscount)}</TableCell>
            <TableCell>{renderCell(nbItems, setNbItems)}</TableCell>
            <TableCell>{renderCell(description, setDescription)}</TableCell>
            <TableCell>{renderProductField()}</TableCell>
            <TableCell>{createdAt}</TableCell> 
            <TableCell>
                <div className="actions d-flex justify-content-center">
                  {renderActionsField()}
                </div>
            </TableCell>
        </TableRow>
    );
};
