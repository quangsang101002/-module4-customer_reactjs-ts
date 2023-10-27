export interface Product {
  product_id: number;
  sku: string;
  name: string;
  unit_price: number;
  description: string;
  category: number;
  created_at: string;
  image: string;
  updated_at: string;
  quantity: number;
  id: number;
  subTotal: number; // Add the subTotal property here
}

export interface State {
  products: Product[];
  total: number;
  totalPricePay: number[];
}

type Action =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "DELETE_PRODUCT_CART"; payload: { id: number } }
  | { type: "CHANGE_QUANTITY"; payload: { id: number; quantity: number } };

const initState: State = {
  products: [],
  total: 0,
  totalPricePay: [],
};

const customerProductReducer = (
  state: State = initState,
  action: Action
): State => {
  let products: Product[] = [];
  let totalPricePay: number[] = [];

  switch (action.type) {
    case "ADD_TO_CART":
      let isExits = false;
      products = state.products.map((item) => {
        console.log(item);

        if (action.payload.product_id === item.product_id) {
          isExits = true;
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
            subTotal: item.quantity * Number(item.unit_price),
          };
        }
        return item;
      });

      if (!isExits) {
        products = [
          ...products,
          {
            ...action.payload,
            subTotal: action.payload.unit_price * action.payload.quantity,
          },
        ];
      }
      break;

    case "DELETE_PRODUCT_CART":
      products = state.products.filter(
        (product) => product.product_id !== action.payload.id
      );
      break;

    case "CHANGE_QUANTITY":
      products = state.products.map((item) => {
        if (item.product_id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: item.unit_price * action.payload.quantity,
          };
        }
        return item;
      });
      break;

    default:
      return state;
  }

  let total = 0;
  for (let item of products) {
    total += item.subTotal;
  }
  console.log(products);

  return {
    ...state,
    products: products,
    total: total,
    totalPricePay: totalPricePay,
  };
};

export default customerProductReducer;
