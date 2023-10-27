import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Router } from "@remix-run/router";

import DefaultLayout from "../layouts/DefaultLayout";
import Header from "../components/partials/Header";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import productDetail from "../pages/productDetail/productDetail";
import Footer from "../components/partials/Footer";
import { Provider } from "react-redux";
import store from "../store";

const routes: RouteObject[] = [
  // {
  //   path: "/productdetail/:id",
  //   Component: productDetail,
  //   children: [
  //     {
  //       index: true,
  //       Component: Header,
  //     },
  //   ],
  // },
  // {
  //   path: "/login",
  //   Component: LoginPage,
  // },
  // {
  //   path: "/register",
  //   Component: Register,
  // },
  // {
  //   id: "root",
  //   path: "/",
  //   Component: DefaultLayout,
  //   children: [
  //     {
  //       index: true,
  //       Component: DashboardPage,
  //     },
  //   ],
  // },
];
const router: Router = createBrowserRouter(routes);

export default router;
