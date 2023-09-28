import {Product} from '../product/Product';
import {Grid} from '@mui/material';
import {PRODUCT_DATA} from '../product/ProductData';

export const Catalogue = () => {
  return (<div>
    <Grid container spacing={4}>
      {PRODUCT_DATA.map((product) => <Product key={product.id} product={product}></Product>)}
    </Grid>
  </div>);
};
