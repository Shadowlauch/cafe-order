import {Card, CardContent, Grid, List, Typography} from '@mui/material';
import {Variant} from '../variant/Variant';

export interface ProductProps {
  product: IProduct;

}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  variants: IProductVariant[];
}

export interface IProductVariant {
  id: string;
  name: string;
  priceVariation: number;
}

export const Product = ({product}: ProductProps) => {
  return (<Grid item key={product.id} xs={12} sm={6} md={4}>
    <Card
      sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
    >
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <List dense={true}>
          {product.variants.map(variant => {

            return (<Variant product={product} variant={variant} key={variant.id + product.id}/>);
          })}
        </List>
      </CardContent>
    </Card>
  </Grid>);
};
