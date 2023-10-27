import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Container } from "react-bootstrap";
import style from "./DefaultLayout.module.scss";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import Slider from "../components/partials/Slider";
import Content from "../pages/contents/Content";

function DefaultLayout() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={style.wrapper}>
      <Header />;
      <div>
        <Slider />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="mt-5">
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
