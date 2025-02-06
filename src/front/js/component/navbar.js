import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import logo from "../../img/logo.jpg"

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<a href="/">
					<img className="navbar-img" src={logo} alt="Placeholder" />
				</a>
			</div>
			<ul className="navbar-list w-100" >
				<div className="navbar-menu d-sm-flex"> 
					<li className="navbar-item">
						<a href="/" className="navbar-link">Inicio</a>
					</li>
					<li className="navbar-item">
						<a href="/newsletter" className="navbar-link">NewsLetter</a>
					</li>
					<li className="navbar-item">
						<a href="/tienda" className="navbar-link">Tienda</a>
					</li>
					<li className="navbar-item">
						<a href="/aboutUs" className="navbar-link">Nosotros</a>
					</li>
				</div>
				<div className="register-buttoms d-sm-flex">
					<Link to="/login">
						<button className="btn">LogIn</button>
					</Link>
					<Link to="/signup">
						<button className="btn">Sign Up</button>
					</Link>
				</div>
			</ul>
		</nav >
	);
};
