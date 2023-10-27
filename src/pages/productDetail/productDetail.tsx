import { Link, Outlet, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import style from "./ProductDetail.module.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import productAPI from "../../apis/product/product.api";
import getStaticFileUrl from "../../utilities/number.util";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
import { addToCart } from "../../store/actions/customer.action";
import { changeQuantity } from "../../store/actions/customer.action";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import clsx from "clsx";

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

const ProductDetail = () => {
  const [getProduct, setGetProduct] = useState<Product[]>([]);
  const [inceaseProduct, setInceaseProduct] = useState<number>(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // changeValue();
    fetchDataProduct();
  }, []);

  const fetchDataProduct = async () => {
    try {
      const response = await productAPI.SearchProduct();
      setGetProduct(response.result.recount);
    } catch (error) {
      alert(error);
    }
  };

  const addProduct = (product: Product, inceaseProduct: number) => {
    dispatch(addToCart(product, inceaseProduct));
  };

  const increase = () => {
    setInceaseProduct(inceaseProduct + 1);
  };
  const reducer = () => {
    if (inceaseProduct >= 1) {
      setInceaseProduct(inceaseProduct - 1);
    }
  };
  return (
    <div>
      <Outlet />
      <div className="row">
        {getProduct.map((product, index) => {
          if (product.product_id === Number(id)) {
            const inputString = product.image;
            const parts = inputString.split(",");

            const part1 = parts[0];
            return (
              <>
                <div
                  key={index}
                  className="col-5"
                  style={{ border: "2px solid" }}
                >
                  <div className={clsx(style.wrapper_left)}>
                    <img
                      src={getStaticFileUrl(part1)}
                      style={{ width: "100%" }}
                      alt="Product Image"
                    />

                    <div className={clsx(style.wrapper_gallery, "row")}>
                      {parts.slice(1, 7).map((product, idx) => (
                        <div key={idx} className={clsx(style.gallery, "col-2")}>
                          <Card.Img
                            variant="top"
                            src={getStaticFileUrl(product)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-7" style={{ border: "2px solid" }}>
                  <h2>
                    <b>Tên sách: </b>
                    {product.name}
                  </h2>
                  <p>
                    <b>Tác giả: </b>
                    {product.description}
                  </p>
                  <h2>
                    {product.unit_price.toLocaleString("vi-VN")}
                    <sup>đ</sup>
                  </h2>
                  Số lượng
                  <div className="d-flex mb-5">
                    <button className="color-btn" onClick={reducer}>
                      -
                    </button>
                    <input
                      className={style.input}
                      min="1"
                      value={inceaseProduct}
                    ></input>

                    <button className="color-btn" onClick={increase}>
                      +
                    </button>
                  </div>
                  <div className="add-product">
                    <Button
                      className="add-product_cart"
                      onClick={() => addProduct(product, inceaseProduct)}
                    >
                      {" "}
                      <LiaCartPlusSolid /> Thêm vào giỏ hàng
                    </Button>
                    <Link to="/cart">
                      {" "}
                      <Button>Mua hàng</Button>
                    </Link>
                  </div>
                </div>
              </>
            );
          }
          return null; // Trả về null nếu không có sản phẩm nào khớp
        })}
      </div>
    </div>
  );
};

export default ProductDetail;
