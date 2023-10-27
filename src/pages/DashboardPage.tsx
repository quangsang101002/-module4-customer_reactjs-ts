import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import stypes from "./DashboardPage.module.scss";

function DashboardPage() {
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
    <div className={(stypes.wrapper, "mt-5")}>
      <div className="row">
        <div className="col-8">
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
        <div className="col-4">
          <img
            src="https://i.pinimg.com/originals/2b/2b/11/2b2b1110569856cc7b4962abf6695e9c.jpg"
            alt="img"
          />
          <img
            className="mt-3"
            src="https://wallpapershome.com/images/pages/pic_h/17125.jpg"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
