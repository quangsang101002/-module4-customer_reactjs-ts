import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Card, Button, ListGroup } from "react-bootstrap";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            <li className="list-group-item">
              <b>Sách Hay Nổi Bật</b>
            </li>
            <li className="list-group-item">
              <a href="#" className="clickable-item">
                Sách Thiếu Nhi
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="clickable-item">
                Sách Văn Học
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="clickable-item">
                Sách Văn Hóa & Nghệ Thuật
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6">
          {" "}
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                src="https://i.pinimg.com/originals/2b/2b/11/2b2b1110569856cc7b4962abf6695e9c.jpg"
                alt="img"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://images6.alphacoders.com/568/568500.jpg"
                alt="img"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://cdn.wallpapersafari.com/40/7/MiBOqc.jpg"
                alt="img"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-3">
          <Card>
            <Card.Img
              variant="top"
              src="https://wallpapershome.com/images/pages/pic_h/17125.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "14px" }}>
                Top 10 sách lịch sử được bạn đọc quan tâm
              </Card.Title>
              <Card.Text style={{ fontSize: "14px", textAlign: "justify" }}>
                Mỗi một quốc gia đều trải qua những giai đoạn lịch sử thăng trầm
                khác nhau. Vì thế, trên thị trường hiện nay, có nhiều sách hay
                về lịch sử nhưng bạn không biết nên chọn cuốn nào cho mình. Vậy
                thì các bạn hãy cùng Book365 tìm hiểu về các cuốn sách lịch sử
                được nhiều người yêu thích nhất ngay dưới đây.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Slider;
