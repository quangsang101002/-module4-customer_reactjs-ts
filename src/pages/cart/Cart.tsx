import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { LiaSadCrySolid } from "react-icons/lia";
import {
  deleteProduct,
  changeQuantity,
  totalPay,
} from "../../store/actions/customer.action";
import { RootState } from "../../store";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./Cart.module.scss";

interface Product {
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
  subTotal: number;
}

const Cart: React.FC = () => {
  const [auto, setAuto] = useState<number | "">("");
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.customerProductReducer.products
  );
  const totalPrice = useSelector((state: RootState) => state.totalPrice.total);
  console.log(totalPrice);

  const [totalPayProducs, setTotalPayProducs] = useState<Product[]>([]);

  const deleteProductCart = (product: Product) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa không",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã xóa", "Bạn đã xóa sản phẩm.", "success");
        dispatch(deleteProduct(product));
        // Cập nhật danh sách sản phẩm đã chọn bằng cách loại bỏ sản phẩm vừa xóa
        setTotalPayProducs((prevProducts) =>
          prevProducts.filter((p) => p.product_id !== product.product_id)
        );
      }
    });
  };

  const reducerProduct = (product: Product) => {
    let initNumber = product.quantity - 1;

    if (initNumber >= 1) {
      dispatch(changeQuantity(initNumber, product.product_id));
      // Cập nhật danh sách sản phẩm đã chọn
      setTotalPayProducs((prevProducts) => [
        ...prevProducts.filter((p) => p.product_id !== product.product_id),
        { ...product, quantity: initNumber },
      ]);
    }
    setAuto(initNumber);
  };

  const increaseProduct = (product: Product) => {
    let initNumber = product.quantity + 1;

    dispatch(changeQuantity(initNumber, product.product_id));
    // Cập nhật danh sách sản phẩm đã chọn
    setTotalPayProducs((prevProducts) => [
      ...prevProducts.filter((p) => p.product_id !== product.product_id),
      { ...product, quantity: initNumber },
    ]);

    setAuto(initNumber);
  };

  const totalPayProduct = (product: Product) => {
    // Cập nhật danh sách sản phẩm đã chọn bằng cách thêm hoặc loại bỏ sản phẩm
    if (totalPayProducs.find((p) => p.product_id === product.product_id)) {
      setTotalPayProducs((prevProducts) =>
        prevProducts.filter((p) => p.product_id !== product.product_id)
      );
    } else {
      setTotalPayProducs((prevProducts) => [...prevProducts, product]);
    }
  };
  useEffect(() => {
    dispatch(totalPay(totalPayProducs));
  }, [totalPayProducs]);
  return (
    <>
      <Outlet />
      <div className={style.check_empty_product_exits}>
        {products.length === 0 ? (
          <h2 className="text-center">
            Bạn chưa có sản phẩm nào
            <small className={style.check_empty_icon}>
              <LiaSadCrySolid />
            </small>
          </h2>
        ) : (
          products.map((product: Product) => (
            <div key={product.product_id} className="row m-0">
              <div className={clsx(style.row_cart, "col-12")}>
                <div className="input-buy">
                  <input
                    type="checkbox"
                    onChange={() => totalPayProduct(product)}
                  ></input>
                </div>
                <div className={style.cart_img}>
                  <img src={product.image} alt=""></img>
                </div>
                <p> {product.name}</p>
                <span className="mr-2">${product.unit_price}</span>
                <div className={style.quality_cart}>
                  <button onClick={() => reducerProduct(product)}>-</button>
                  <input value={product.quantity}></input>
                  <button onClick={() => increaseProduct(product)}>+</button>
                </div>
                <div className={style.cart_price}>
                  <p>{product.subTotal}</p>
                </div>
                <div className={style.cart_delete}>
                  <button
                    className={style.add_product_buy}
                    onClick={() => deleteProductCart(product)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="total_price-cart">
          <div className="wrapper-total_price-cart">
            <p>Tổng thanh toán({totalPayProducs.length}sản phẩm) </p>
            <h2>
              {totalPrice > 0 ? totalPrice.toLocaleString("vi-VN") : 0}{" "}
              <sup>đ</sup>
            </h2>
            <div className="total_price-cart-order">
              <Link to="/contacts">
                <button className="add-product_buy">Đặt hàng</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
