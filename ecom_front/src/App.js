import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Authentification from "./pages/Authentification";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Advanced from "./pages/Advanced";

import MyAccount from "./pages/myAccount/MyAccount";
import AccountGestion from "./pages/myAccount/AccountGestion";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authentification' element={<Authentification />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/advanced' element={<Advanced />} />
          <Route path='/myAccount' element={<MyAccount />} />
          <Route path='/myAccount/accountGestion' element={<AccountGestion />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
