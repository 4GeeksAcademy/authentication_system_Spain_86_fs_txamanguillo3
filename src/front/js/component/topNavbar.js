import React, { useContext, useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/topNavbar.css'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import Offcanvas from 'react-bootstrap/Offcanvas';


export const TopNavbar = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const isAuthenticated = token !== null && token !== undefined && token !== "";

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };

    const handleClose = () => setMenuOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        actions.searchProducts(searchTerm);
        navigate("/");
    };

    useEffect(() => {
        if (searchTerm.trim() === "") {
            actions.searchProducts("");
        }
    }, [searchTerm]);


    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <Navbar expand="md" className="navbarTop" >
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
            <Navbar.Offcanvas id="navbarScroll" placement="end" collapseOnSelect
                restoreFocus={false}
                show={menuOpen}
                onHide={handleClose}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Nav className='menu d-flex align-items-center'>
                    <Nav.Link className='linkButtom' as={Link} to="/" onClick={toggleMenu}>Tienda</Nav.Link>
                    <Nav.Link className='linkButtom' as={Link} to="/slidetobuy" onClick={toggleMenu}>Ofertas</Nav.Link>
                    <Nav.Link className='linkButtom' as={Link} to="/aboutUs" onClick={toggleMenu}>Sobre nosotros</Nav.Link>
                    &nbsp;&nbsp;
                    {isAuthenticated ? (
                        <Button className='button1' as={Link} to='/session/profile' onClick={toggleMenu}>Perfil</Button>
                    ) : (<>
                        <Button className='button1' as={Link} to='/login' onClick={toggleMenu}>Inicia sesión</Button>
                        <Button className='button1' as={Link} to='/signup' onClick={toggleMenu}>Regístrate</Button>
                    </>)}
                </Nav>
            </Navbar.Offcanvas>
            <Button className='buttonCart' onClick={handleCartClick}><i className="fa-solid fa-cart-shopping"></i>&nbsp;<span >{store.cart.length}</span></Button>
            <Navbar.Toggle aria-controls="navbarScroll"
                onClick={toggleMenu} />
        </Navbar>
    )
}
