import {IProduct} from './Product';

export const PRODUCT_DATA: IProduct[] = [
  {
    id: "hot-choclate",
    name: "Hot Chochlate",
    price: 500,
    variants: [
      {
        id: "small",
        name: "Small",
        priceVariation: -50
      },
      {
        id: "large",
        name: "Large",
        priceVariation: 50
      }
    ]
  },
  {
    id: "coffee",
    name: "Coffee",
    price: 500,
    variants: [
      {
        id: "coffee-small",
        name: "Small",
        priceVariation: -50
      }
    ]
  }
];
