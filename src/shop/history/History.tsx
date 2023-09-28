import {atom, useRecoilValue} from 'recoil';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {ICartItem} from '../cart/Cart';
import {Order} from './Order';
import {convertCurrency} from '../../utils/convertCurrency';

interface IOrderHistory {
  orders: IOrder[];
  total: number;
}

export type ILineItem = ICartItem & { total: number };

export interface IOrder {
  items: ILineItem[];
  total: number;
}

export const orderHistoryState = atom<IOrderHistory>({
  key: 'orderHistory',
  default: {
    orders: [],
    total: 0
  }
});

export const OrderHistory = () => {
  const orderHistory = useRecoilValue(orderHistoryState);

  return (
    <>
      <Typography variant={'h5'} sx={{padding: 1}}>Order History</Typography>
      {orderHistory.orders.length <= 0 &&
        <Box sx={{padding: 1, display: 'flex', justifyContent: 'center'}}>
          <Typography>Order History is empty</Typography>
        </Box>
      }
      {orderHistory.orders.length > 0 &&
        <>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.orders.map((o, index) => (<Order order={o} index={index} key={index}/>))}
                <TableRow sx={{borderTopWidth: 2, borderTopStyle: 'solid'}}>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">{convertCurrency(orderHistory.total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    </>
  );
};
