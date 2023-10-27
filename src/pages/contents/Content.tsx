import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import productAPI from "../../apis/product/product.api";
import getStaticFileUrl from "../../utilities/number.util";
import { Link } from "react-router-dom";
import style from "./Content.module.scss";

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

function Content() {
  const [search, setSearch] = useState<string>("");
  const [displayProduct, setDisplayProduct] = useState<Product[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [numberMin, setNumberMin] = useState<string>("");
  const [numberMax, setNumberMax] = useState<string>("");
  const [priceMin, setPriceMin] = useState<number>(0); // Thêm state cho priceMin
  const [priceMax, setPriceMax] = useState<number>(0); // Thêm state cho priceMax

  useEffect(() => {
    searchProducts();
  }, [search, numberMin, numberMax]);

  const searchProducts = async () => {
    try {
      const response = await productAPI.SearchProduct(search);
      console.log(response);
      if (response) {
        setDisplayProduct(response.result.recount);
        setTotalProduct(response.result.totalProduct);
      } else {
        alert(1);
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(parseInt(event.target.value));

    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành s
    setPriceMin(parseInt(numericValue)); // Lưu dưới dạng số
    setNumberMin(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(parseInt(event.target.value));

    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành s
    setPriceMax(parseInt(numericValue)); // Lưu dưới dạng số
    setNumberMax(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  const handleSearchPrice = () => {
    const i = displayProduct.filter(
      (product) =>
        priceMax >= product.unit_price && priceMax <= product.unit_price
    );
    setDisplayProduct(i);
  };
  return (
    <>
      <div className="row">
        <div className="col-2">
          <span>Khoảng Giá</span>
          <div className="d-flex mb-3">
            <input
              type="text"
              placeholder="từ"
              value={numberMin} // Giá trị thể hiện cho priceMin
              onChange={handlePriceMinChange}
            />
            {" - "}
            <input
              type="text"
              placeholder="đến"
              value={numberMax} // Giá trị thể hiện cho priceMax
              onChange={handlePriceMaxChange}
            />
          </div>
          <button style={{ width: "100%" }} onClick={handleSearchPrice}>
            Áp Dụng
          </button>
        </div>

        <div className="col-10">
          <div className={style.wrapper_input}>
            <input
              type="search"
              placeholder="tìm kiếm sản phẩm"
              onChange={searchProduct}
            />
          </div>
          <Row xs={1} md={5} className="g-6">
            {displayProduct.map((product, idx) => {
              const inputString = product.image;
              const parts = inputString.split(",");
              const part1 = parts[0];

              return (
                <Link to={`/productdetail/${product.product_id}`} key={idx}>
                  <Col style={{ paddingBottom: "24px" }}>
                    <Card>
                      <Card.Img variant="top" src={getStaticFileUrl(part1)} />
                      <Card.Body className="text-center">
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>
                          <h2>
                            {product.unit_price.toLocaleString("vi-VN")}
                            <sup>đ</sup>
                          </h2>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Content;
