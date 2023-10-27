// Sử dụng các kiểu dữ liệu TypeScript cho các tham số và giá trị trả về

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
  id: number;
}

interface Action {
  type: string;
  payload?: any; // Thay any bằng kiểu dữ liệu cụ thể nếu có thể xác định trước được

  // Thêm các thuộc tính khác của action nếu cần
}

// Định nghĩa các hàm hành động
export const addToCart = (product: Product, quantity: number): Action => {
  return {
    type: "ADD_TO_CART",
    payload: {
      ...product,
      quantity,
    },
  };
};

export const deleteProduct = (product: Product): Action => {
  return {
    type: "DELETE_PRODUCT_CART",
    payload: product,
  };
};

export const changeQuantity = (quantity: number, id: number): Action => {
  return {
    type: "CHANGE_QUANTITY",
    payload: {
      id,
      quantity,
    },
  };
};

export const totalPay = (product: any): Action => {
  return {
    type: "TOTAL_PAY",
    payload: product,
  };
};

export const deleteQuantity = (product: Product, id: number): Action => {
  return {
    type: "DELETE_QUANTITY",
    payload: {
      product,
      id,
    },
  };
};
