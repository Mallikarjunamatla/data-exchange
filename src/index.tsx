import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import {store} from "./redux/store";
import "./index.css";
import Login from "./components/Login";
import Table from "./components/Table";

ReactDOM.render(
	<BrowserRouter>
	   <Fragment>
	   <Provider store={store}>		
	   <Routes>
				<Route element={<Table/>} path="/table">
						
				</Route>
                 <Route element={<Login />} path="/">
						
				</Route>
		</Routes>
	   </Provider>
	   </Fragment>
	</BrowserRouter>,
	document.getElementById("root")
);