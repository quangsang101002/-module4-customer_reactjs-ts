import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import authAPI from "../../apis/auth/auth/requests/author.api,";
import orderAPI from "../../apis/order/order.api";
import { RootState } from "../../store";

const Contacts: React.FC = () => {
  const [userContact, setUserContact] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userName, setUsername] = useState<number | undefined>();
  // const [content, setContent] = useState<string>('');
  console.log("id", userName);
  const products = useSelector(
    (state: RootState) => state.totalPrice.totalPricePay
  );
  const totalPircePay = useSelector(
    (state: RootState) => state.totalPrice.total
  );
  const formattedTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const navigate = useNavigate();
  const infoOrder = products.map((product, index) => ({
    ...product,
    // email: email,
    time: formattedTime,
    totalPrice: totalPircePay,
    // note: content,
    nameUserOrder: userContact,
    id: products.length + 1,
  }));

  const fetchData = async () => {
    try {
      const response = await authAPI.getAuth();
      setUsername(response.id);
    } catch (error) {
      //   navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const orderProduct = (product: any) => {
    const products = product.map((prd: any) => {
      return {
        serial_number: prd.sku,
        status: "1",
        note: content,
        total_price: prd.subTotal,
        user_id: userName,
        nameproduct: prd.name,
        avatar: prd.image,
      };
    });

    try {
      const addOrder = orderAPI.addOrder(products);

      //   Swal.fire({
      //     title: "",
      //     text: "Bạn đã đặt hàng thành công",
      //     icon: "success",
      //   });
      //   navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5 container-cart">
        <table id="customers">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng </th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          {products.map((product: any) => {
            return (
              <tbody key={product.id}>
                <tr>
                  <td>
                    <div className="cart-img-order">
                      <img src={product.image} alt=""></img>
                      <small> {product.name}</small>
                    </div>
                  </td>
                  <td className="td-order">{product.unit_price}</td>
                  <td className="td-order">{product.quantity}</td>
                  <td className="td-order">{product.subTotal}</td>
                </tr>
              </tbody>
            );
          })}
          <tr>
            <td colSpan={2}>
              <div className="address-contact"></div>

              <div className="address-contact"></div>
            </td>

            <td colSpan={2} className="td-order">
              Tổng số tiền({products.length} sản phẩm) {totalPircePay}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="address-contact">
                <label htmlFor="note">Lời nhắn</label>
                <input
                  type="text"
                  name="content"
                  placeholder="Lưu ý cho người bán..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                ></input>
              </div>
            </td>
            <td colSpan={2}>
              <div>Đơn vị vận chuyển</div>
            </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <div className="total-order-pay">
                <h2>Tổng thanh toán</h2>
                <h2 className="text-center">{totalPircePay}</h2>
                <button
                  type="button"
                  className="mb-5 add-product_order add-product_buy"
                  onClick={() => orderProduct(products)}
                >
                  Đặt hàng
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Contacts;
