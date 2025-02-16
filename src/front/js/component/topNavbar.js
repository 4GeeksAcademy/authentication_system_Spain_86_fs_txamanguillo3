import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/topNavbar.css'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';

export const TopNavbar = () => {
    return (
        <div className=" navbarTop">
            <Navbar expand="lg" className="">
                <Container className=''>
                    <div className=''>
                        <button className='searchButton'><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav>
                            <Nav.Link className='linkButtom' href="/">Home</Nav.Link>
                            <Nav.Link className='linkButtom' href="/slidetobuy">Slide to Buy</Nav.Link>
                            <Nav.Link className='linkButtom' href="/tienda">Shop</Nav.Link>
                            <Nav.Link className='linkButtom' href="/aboutUs">About us</Nav.Link>
                            <Nav.Link className='linkButtom' href=""></Nav.Link>
                        </Nav>
                        <div className='userButtoms d-flex gap-2'>
                            <Button className='button1' href='/login' >Log in</Button>
                            <Button className='button1' href='/signup'>Sign Up</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
