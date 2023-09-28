import {IconButton, ListItem, ListItemText} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {IProduct, IProductVariant} from '../product/Product';
import {VariantAddToCartDialog} from './VariantAddToCartDialog';
import {useState} from 'react';
import {useAddToCart} from '../cart/UseAddToCart';

export interface VariantProps {
  product: IProduct;
  variant: IProductVariant;

}

export const Variant = ({product, variant}: VariantProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const addToCart = useAddToCart();

  const handleCancelDialog = () => setOpenDialog(false);
  const handleAddToCart = (quantity: number) => {
    setOpenDialog(false);
    addToCart(product.id, variant.id, quantity);
  }

  return (
    <>
      <ListItem
        key={product.id + variant.id}
        secondaryAction={
          <IconButton edge="end" aria-label="add to shopping cart" onClick={() => setOpenDialog(true)}>
            <AddShoppingCartIcon/>
          </IconButton>
        }
      >
        <ListItemText
          primary={variant.name}
          secondary={`${variant.priceVariation + product.price} 円`}
        />
      </ListItem>
      <VariantAddToCartDialog open={openDialog} onAddToCart={handleAddToCart} onCancel={handleCancelDialog} name={`${product.name} - ${variant.name}`} />
    </>
  );

};
