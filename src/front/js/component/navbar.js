import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import logo from "../../img/logo.jpg"

export const Navbar = () => {

	document.querySelectorAll('.button').forEach(button => {

		let div = document.createElement('div'),
			letters = button.textContent.trim().split('');

		function elements(letter, index, array) {

			let element = document.createElement('span'),
				part = (index >= array.length / 2) ? -1 : 1,
				position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
				move = position / (array.length / 2),
				rotate = 1 - move;

			element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
			element.style.setProperty('--move', move);
			element.style.setProperty('--rotate', rotate);
			element.style.setProperty('--part', part);

			div.appendChild(element);

		}

		letters.forEach(elements);

		button.innerHTML = div.outerHTML;

		button.addEventListener('mouseenter', e => {
			if (!button.classList.contains('out')) {
				button.classList.add('in');
			}
		});

		button.addEventListener('mouseleave', e => {
			if (button.classList.contains('in')) {
				button.classList.add('out');
				setTimeout(() => button.classList.remove('in', 'out'), 950);
			}
		});

	});

	return (
		<nav className="navbar-top d-flex flex-column">
			<div className="navbar-top d-flex">
				<div className="navbar-search position-absolute start-0 p-3 gap-2">
				<button class="button-search"><i class="fa-solid fa-magnifying-glass"></i></button>
					<input className="input"></input>
				</div>
				<a href="/home">
					<img className="navbar-img" src={logo} />
				</a>
				<div className="register position-absolute end-0 p-3">
					<Link to="/login">
						<button class="button-register">Log In</button>
					</Link>
					<Link to="/signup">
						<button class="button-register">Sign In</button>
					</Link>
				</div>
			</div>
			<div className="navbar-bot">
				<ul className="gap-5">
					<div className="navbar-menu mt-4">
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
				</ul>
			</div>
		</nav >
	);
};
