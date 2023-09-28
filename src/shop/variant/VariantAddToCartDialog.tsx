import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Typography} from '@mui/material';
import {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useSnackbar} from 'notistack';

interface VariantAddToCartDialogProps {
  open: boolean;
  onAddToCart: (quantity: number) => void;
  onCancel: () => void;
  name: string;
}

export const VariantAddToCartDialog = ({open, onAddToCart, onCancel, name}: VariantAddToCartDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const {enqueueSnackbar} = useSnackbar();

  const handleOnAddToCart = () => {
    onAddToCart(quantity);
    enqueueSnackbar(`${name} was added to the cart`, {variant: 'success'});
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    setQuantity(Math.min(10, Math.max(0, newQuantity)));
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Select the quantity of ${name} to add to the cart`}
      </DialogTitle>
      <DialogContent>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="decrease" onClick={() => handleQuantityChange(-1)}>
            <RemoveIcon />
          </IconButton>
          <Typography
            sx={{ ml: 1, flex: 1 }}
          >{quantity}</Typography>
          <IconButton sx={{ p: '10px' }} aria-label="increase" onClick={() => handleQuantityChange(1)}>
            <AddIcon />
          </IconButton>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleOnAddToCart}>
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  )
}
