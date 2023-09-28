import {useSetRecoilState} from 'recoil';
import {ILineItem, IOrder, orderHistoryState} from './History';
import {ICartItem} from '../cart/Cart';
import {PRODUCT_DATA} from '../product/ProductData';

export const useAddToHistory = () => {
  const setOrderHistoryState = useSetRecoilState(orderHistoryState);

  return (cartItems: ICartItem[]) => {
    setOrderHistoryState(oldHistoryState => {
      const newHistoryState = {...oldHistoryState};

      const lineItems = cartItems.map<ILineItem>((ci) => {
        const product = PRODUCT_DATA.find(p => p.id === ci.productId)!;
        const variant = product?.variants.find(v => v.id === ci.variantId)!;
        const total = (product.price + variant.priceVariation) * ci.quantity;

        return {...ci, total};
      });

      const newOrder: IOrder = {
        items: lineItems,
        total: lineItems.reduce((acc, li) => acc + li.total, 0)
      }

      newHistoryState.orders = [...newHistoryState.orders, newOrder];
      newHistoryState.total += newOrder.total;

      return newHistoryState;
    });
  };
};
