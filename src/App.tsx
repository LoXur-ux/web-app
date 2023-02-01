import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Appbar from "./components/Appbar";
import Home from "./components/page/Home";
import Order from "./components/page/Order";
import Personal from "./components/page/Personal";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import Orders from "./components/page/Orders";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { WorkerOrders } from "./components/page/WorkerOrders";

const App: React.FC = () => {
  const user = useSelector((u: RootState) => u.client);
  return (
    <Router>
      <Appbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" />
          {user !== null && user !== undefined && user.client?.Role === 2 ? (
            <Route path="work/orders" element={<WorkerOrders />} />
          ) : (
            <></>
          )}
          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
