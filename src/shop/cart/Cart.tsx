import {atom, selector, useRecoilState} from 'recoil';
import {Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {useMemo} from 'react';
import {PRODUCT_DATA} from '../product/ProductData';
import {convertCurrency} from '../../utils/convertCurrency';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAddToHistory} from '../history/UseAddToHistory';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';

export interface ICartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export const cartState = atom<ICartItem[]>({
  key: 'cart',
  default: []
});

export const cartItemsCountState = selector({
  key: 'cartItemsCount',
  get: ({get}) => {
    const cartItems = get(cartState);

    return cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  },
});


export const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const { enqueueSnackbar } = useSnackbar();

  const addToOrderHistory = useAddToHistory();
  const navigate = useNavigate();

  const cartItemsWithProducts = useMemo(() => {
    return cartItems.map((ci) => {
      const product = PRODUCT_DATA.find(p => p.id === ci.productId)!;
      const variant = product?.variants.find(v => v.id === ci.variantId)!;
      const total = (product.price + variant.priceVariation) * ci.quantity;

      return {...ci, product, variant, total};
    });
  }, [cartItems]);

  const handleRemoveLine = (productId: string, variantId: string) => {
    const index = cartItems.findIndex(ci => ci.productId === productId && ci.variantId === variantId);

    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
  };

  const handleOrder = () => {
    addToOrderHistory(cartItems);
    setCartItems([]);
    enqueueSnackbar('The order was sent!', {variant: 'success'});
    navigate('/');
  }

  const cartTotal = cartItemsWithProducts.reduce((acc, ci) => acc + ci.total, 0);

  return (
    <>
      <Typography variant={'h5'} sx={{padding: 1}}>Cart</Typography>
      {cartItems.length <= 0 &&
        <Box sx={{padding: 1, display: 'flex', justifyContent: 'center'}}>
          <Typography>Cart is empty</Typography>
        </Box>
      }
      {cartItems.length > 0 &&
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
                {cartItemsWithProducts.map((ci) => {
                  return (<TableRow key={ci.variantId + ci.productId}>
                      <TableCell>{ci.product.name} - {ci.variant.name}</TableCell>
                      <TableCell align="right">
                        {ci.quantity}
                        <IconButton onClick={() => handleRemoveLine(ci.productId, ci.variantId)}>
                          <DeleteIcon fontSize={'small'}/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">{convertCurrency(ci.total)}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell/>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell align="right">{convertCurrency(cartTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{paddingTop: 2, display: 'flex', justifyContent: 'right'}}>

            <Button variant={'contained'} onClick={handleOrder}>Order</Button>
          </Box>
        </>
      }
    </>
  );
};
