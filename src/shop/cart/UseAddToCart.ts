import {useSetRecoilState} from 'recoil';
import {cartState} from './Cart';

export const useAddToCart = () => {
  const setCartState = useSetRecoilState(cartState);

  return (productId: string, variantId: string, quantity: number) => {
    setCartState(oldCartState => {
      const newCartState = [...oldCartState];
      const oldItemIndex = oldCartState.findIndex(i => i.productId === productId && i.variantId === variantId);
      if (oldItemIndex !== -1) newCartState[oldItemIndex] = {...oldCartState[oldItemIndex], quantity: oldCartState[oldItemIndex].quantity + quantity};
      else newCartState.push({productId, quantity, variantId});

      return newCartState;
    });
  };
};
