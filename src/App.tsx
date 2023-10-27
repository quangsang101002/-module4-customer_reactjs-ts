import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import your Redux Provider here
import { Store } from "redux"; // Import Store from Redux
import store from "./store"; // Import your Redux store here

import DefaultLayout from "./layouts/DefaultLayout";
import Header from "./components/partials/Header";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ProductDetail from "./pages/productDetail/productDetail";
import Footer from "./components/partials/Footer";
import Cart from "./pages/cart/Cart";
import Contacts from "./pages/contacts/Contacts";

const AppRouter: React.FC = () => (
  <Provider store={store as Store}>
    {" "}
    {/* Cast store to Store */}
    <BrowserRouter>
      <Routes>
        <Route path="/productdetail/:id" element={<ProductDetail />}>
          <Route index element={<Header />} />
        </Route>
        <Route path="/cart" element={<Cart />}>
          <Route index element={<Header />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default AppRouter;
