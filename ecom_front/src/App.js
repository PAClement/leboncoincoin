import React from "react";
import { Routes, Route } from "react-router-dom";

import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Advanced from "./pages/Advanced";

import MyAccount from "./pages/myAccount/MyAccount";
import AccountGestion from "./components/userAccount/AccountGestion";

import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import PublicRoutes from "./components/auth/PublicRoutes";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import UserOrder from "./components/userAccount/UserOrder";
import UserWishList from "./components/userAccount/UserWishList";
import Main from "./pages/Main";
import Ticket from "./components/userAccount/Ticket";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/advanced' element={<Advanced />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myAccount' element={<ProtectedRoutes />}>
            <Route path='/myAccount' element={<MyAccount />}>
              <Route path='/myAccount/accountGestion' element={<AccountGestion />} />
              <Route path='/myAccount/userOrder' element={<UserOrder />} />
              <Route path='/myAccount/userWishList' element={<UserWishList />} />
              <Route path='/myAccount/ticket' element={<Ticket />} />
            </Route>
          </Route>
        </Route>

        <Route path='/authentification' element={<PublicRoutes />}>
          <Route path='/authentification' element={<Authentification />} />
        </Route>

        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
