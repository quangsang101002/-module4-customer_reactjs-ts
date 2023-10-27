import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import style from "./Header.module.scss";
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import { Link } from "react-router-dom";
import authAPI from "../../apis/auth/auth/requests/author.api,";

function Header() {
  const [user, setUser] = useState<string>("");
  console.log(user);

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const response = await authAPI.getAuth();

      setUser(response.username);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        {!user ? (
          <div className={clsx(style.infomation, "d-flex mb-3")}>
            <select>
              <option>Tiếng Việt</option>
              <option>Tiếng Anh</option>
            </select>
            <li>
              {" "}
              <a href="register">Đăng kí</a>
            </li>
            <li>
              <a href="login">Đăng nhập</a>
            </li>
          </div>
        ) : (
          <div className={clsx(style.infomation, "d-flex mb-3")}>
            <li>Thông Báo</li>
            <select>
              <option>Tiếng Việt</option>
              <option>Tiếng Anh</option>
            </select>

            <div>{user}</div>
          </div>
        )}

        <div className={style.wrapper_search}>
          <Navbar.Brand href="#home">
            <Link to="/">
              <h2>Sang Rose</h2>
            </Link>
          </Navbar.Brand>
          <Form className={clsx(style.input_seach, "d-flex")}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <div>
            <BsCart2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
