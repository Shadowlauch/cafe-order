import {IOrder} from './History';
import {Box, TableCell, TableRow} from '@mui/material';
import {convertCurrency} from '../../utils/convertCurrency';
import {useMemo} from 'react';
import {PRODUCT_DATA} from '../product/ProductData';

export interface OrderProps {
  order: IOrder;
  index: number;
}

export const Order = ({order, index}: OrderProps) => {
  const orderItemsWithProducts = useMemo(() => {
    return order.items.map((oi) => {
      const product = PRODUCT_DATA.find(p => p.id === oi.productId)!;
      const variant = product?.variants.find(v => v.id === oi.variantId)!;

      return {...oi, product, variant};
    });
  }, [order]);

  return (
    <>
      <TableRow>
        <TableCell colSpan={3}><Box component="span" fontWeight='fontWeightMedium'>Order {index}</Box></TableCell>
      </TableRow>
      {orderItemsWithProducts.map((li) => {
        return (
          <TableRow key={index + li.productId + li.variantId}>
            <TableCell>{li.product.name} - {li.variant.name}</TableCell>
            <TableCell align="right">
              {li.quantity}
            </TableCell>
            <TableCell align="right">{convertCurrency(li.total)}</TableCell>
          </TableRow>
        );
      })}

      <TableRow>
        <TableCell/>
        <TableCell colSpan={1}>Order Total</TableCell>
        <TableCell align="right">{convertCurrency(order.total)}</TableCell>
      </TableRow>
    </>
  );
};
