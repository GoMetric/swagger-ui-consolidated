import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

// render layout
ReactDOM.render(
      <BrowserRouter>
          <Layout />
      </BrowserRouter>,
    document.getElementById('app')
);
