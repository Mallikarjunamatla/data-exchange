import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
import { signInWithGoogleAPI, signInWithEmailPassword } from "../redux/actions/actions";

const Container = styled.div`
 background: url(/images/back.jpg) ;
  height: fit-content;
padding-right : 160px;
@media only screen and (max-width : 768px){
	padding: 5%;
}
 
`;

const Nav = styled.nav`
	max-width: 1128px;
	margin: auto;
	padding: 12px 0 16px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	position: relative;
	& > a {
		width: 130px;
		height: 35px;
		@media (max-width: 768px) {
			padding: 0 5px;
		}
	}
`;

const Join = styled.a`
	font-size: 16px;
	padding: 10px;
	text-decoration: none;
	border-radius: 5px;
	color: rgba(0, 0, 0, 0.6);
	margin-right: 8px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		color: rgba(0, 0, 0, 1);
	}
`;

const SignIn = styled.a`
	box-shadow: inset 0 0 0 1px #0a66c2;
	border-radius: 25px;
	color: #0a66c2;
	font-size: 16px;
	font-weight: 600;
	transition-duration: 167ms;
	line-height: 40px;
	padding: 10px 25px;
	text-align: center;
	background-color: transparent;
	&:hover {
		background-color: rgba(112, 181, 249, 0.15);
		box-shadow: inset 0 0 0 2px #0a66c2;
	}
`;

const Section = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-content: start;
	min-height:  100%;
	
	padding-top: 40px;
	padding: 60px 0;
	position: relative;
	width: 100%;
	max-width: 1128px;
	align-items: center;
	margin: auto;
	@media (max-width: 768px) {
		min-height: 0;
	}
`;

const Hero = styled.div`
	width: 100%;
	h1 {
		padding-bottom: 0;
		width: 55%;
		font-size: 56px;
		color: #2977c9;
		font-weight: 200;
		line-height: 70px;
		@media (max-width: 768px) {
			text-align: center;
			width: 100%;
			font-size: 20px;
			line-height: 2;
		}
	}
	div{
		display : flex;
		flex-direction : column;
		margin-top : 10px;
		margin-left : 50px;
	}
	div > input{
		width : 30%;
		height : 40px;
		margin : 5px;
		border-radius : 5px;
		font-size : 1em;
		padding: 1% ;
	}
	div > input[type = "submit"]
	{
		width : 20%;
		background-color : #2977c9; 
		color : #fff;
		font-weight : 700;
		padding : 0.5em;
	}
	
	@media (max-width: 768px) {
		div > input {
			width : 60%;
		}
	}
`;

const Form = styled.div`
margin-top: 20px;
margin-left : 40px;
	@media (max-width: 768px) {
		margin: 20px auto 0;
	}
`;

const Google = styled.button`
	
	justify-content: center;
	align-items: center;
	background-color: #fff;
	height: 40px;
	width: 200px;
	font-size : 14px;
	border-radius: 30px;
	box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0);
	border: none;
	vertical-align: middle;
	transition-duration: 167ms;
	color: rgba(0, 0, 0, 0.6);
	z-index: 0;
	&:hover {
		background-color: #fff;
		color: rgba(175, 32, 127, 0.75);
		box-shadow: inset 0 0 0 2px rgb(0 0 0 / 60%), inset 0 0 0 3px rgb(0 0 0 / 0%), inset 0 0 0 2px rgb(0 0 0 / 0);
	}
	img {
		margin-right: 25px;
	}
`;

const Footer = styled.div`
		p{
		margin-left : 50%;
		margin-top: 0%;
		color : #000;
		
		}
	  `;

function Login(props : any) {
      const [email,setEmail] = useState('');
	  const [password,setPassword] = useState('');
	  

	const loginHandler =(e : React.FormEvent<HTMLFormElement>) =>{
			// e.preventDefault();
           const payload = {
            email : email,
            password : password,
        };
		props.login(payload);
		setEmail("");
		setPassword('');

	}
	return (
		<Container>
			{props.user && <Navigate to="/table" />}
			<Nav>
				<a href="/">
					<img src="/images/LogoJ.jpg" alt="" />
				</a>
				<div>
					
				</div>
			</Nav>
			<Section>
				<Hero>
					
					
					
					
				    <Join></Join>
					<SignIn>Manage Teams</SignIn>
					<form onSubmit={loginHandler} action="">
						<div >
							<input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
							<input type="password"onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
							<input type="submit" value="Login"/>
						</div>
					</form>
					
				</Hero>
				<Form>
					<Google onClick={() => props.signIn()}>
						<img src="/images/google.svg" alt="" />
						Sign in with Google
					</Google>
				</Form>
			</Section>
			<Footer>
				<p></p>
			</Footer>
		</Container>
	);
}

const mapStateToProps = (state: { user: { user: any; }; }) => {
	return {
		user: state.user.user,
	};
};

const mapDispatchToProps = (dispatch : any) => ({
	signIn: () => dispatch(signInWithGoogleAPI()),
	login : (payload: { email: string; password: string; }) => dispatch(signInWithEmailPassword(payload.email,payload.password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);