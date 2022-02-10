import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"; 
import Table from "./components/Table";
import { useEffect } from "react";
import { getUserAuth } from "./redux/actions/actions";
import { connect } from "react-redux";
import { useState } from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import './App.css'
function App(props : any) {
	const [load,setLoad] = useState(false);
	const [width, setWidth]   = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	useEffect( () => {

		async function get(){
			setLoad(true)
			await props.getUserAuth();
			setLoad(false)
		}
		get();
	//	console.log(props.getUserAuth());
		
	}, []);

	

	return (
		<div className="App">
				{!props.user ? <Navigate to='/'/> : <Main /> }
         	</div>
	);
}

const mapStateToProps = (state: { user: { user: any; }; records: { loading: any; }; }) => {
	return{
		user: state.user.user,
	  loading: state.records.loading,
	}
	
};

const mapDispatchToProps = (dispatch : any) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);