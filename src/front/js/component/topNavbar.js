import React, { useContext, useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/topNavbar.css'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Context } from '../store/appContext';


export const TopNavbar = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const isAuthenticated = token !== null && token !== undefined && token !== "";

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        actions.searchProducts(searchTerm);
        navigate("/tienda");
    };

    useEffect(() => {
        if (searchTerm.trim() === "" && store.filteredProducts.length !== store.productList.length) {
            actions.getProductList(); 
        }
    }, [searchTerm]); 

    const handleCartClick = () => {
        navigate('/session/payment');
    };

    return (
        <Navbar expand="lg" className="navbarTop">
            <form className='searcher' onSubmit={handleSearch}>
                <input
                    type="search"
                    placeholder="Search"
                    className="searcherImput"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='searchButton' type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">

                    <Nav className='menu'>
                        <Nav.Link className='linkButtom'as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className='linkButtom' as={Link} to="/slidetobuy">Slide to Buy</Nav.Link>
                        <Nav.Link className='linkButtom' as={Link} to="/tienda">Tienda</Nav.Link>
                        <Nav.Link className='linkButtom' as={Link} to="/aboutUs">About us</Nav.Link>
                    </Nav>

                {isAuthenticated ? (
                    <div className='userButtoms'>
                        <Button className='button1' as={Link} to='/session/profile' >Profile</Button>
                    </div>
                ) : (
                    <div className='userButtoms'>
                        <Button className='button1' as={Link} to='/login' >Log in</Button>
                        <Button className='button1' as={Link} to='/signup'>Regístrate</Button>
                    </div>
                )}
            </Navbar.Collapse>
            <Button className='buttonCart' onClick={handleCartClick}><i className="fa-solid fa-cart-shopping"></i>&nbsp;<span >{store.cart.length}</span></Button>
        </Navbar>
    )
}
