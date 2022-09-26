import "./App.css";
import BasicView from "./components/BasicView/BasicView";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import AddProduct from "./components/AddProduct/AddProduct";

const App = () => {
  return (
    <div className="App printToA4">
      <Routes>
        <Route element={<BasicView />} path="/" />
        <Route element={<AddProduct />} path="/addProduct" />
      </Routes>
    </div>
  );
};

export default App;
