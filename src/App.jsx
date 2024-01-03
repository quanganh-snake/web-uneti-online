import React from "react";
import MainCommon from "./Layouts/Mains/MainCommon";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "@/Styles/css-vars.scss";

function App() {
  return (
    <BrowserRouter>
      <MainCommon />
    </BrowserRouter>
  );
}

export default App;
