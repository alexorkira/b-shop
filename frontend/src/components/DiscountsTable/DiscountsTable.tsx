import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import React from 'react';
import { toast } from 'react-toastify';
import { DiscountRow } from '../../atoms/DiscountRow/DiscountRow';
import { Discount } from '../../models/Discount';
import { Product } from '../../models/Product';
import { DiscountsService } from '../../services/discounts.service';
import ContextStore from '../../store';

interface DiscountTableProps {
    discountsList: Array<Discount>;
    productsList: Array<Product>;
}
export const DiscountsTable: React.FunctionComponent<DiscountTableProps> = (
    props: DiscountTableProps
) => {
    const removeDiscount = ContextStore.useStoreActions((a => a.discounts.remove));

    const deleteDiscount = async (id: string, index: number) => {
        DiscountsService.deleteRule(id)
            .then(() => {
                toast.success(`Removed rule`); 
                removeDiscount(index);
            })
            .catch(e => toast.error(e));
    }

    return (
        <div className='discount-table'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Discount price (€)</TableCell>
                            <TableCell>Nb Products</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Creation date</TableCell>
                            <TableCell className="text-center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.discountsList.map((discount: Discount, index: number) => 
                            <DiscountRow 
                                key={index} 
                                discount={discount} 
                                productsList={props.productsList}
                                deleteAction={(id: string) => deleteDiscount(id, index)}
                                isNew={discount.id === undefined}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
