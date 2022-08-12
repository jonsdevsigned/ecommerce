import { useState } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CartSidebar from './CartSidebar';

const NavBar = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const token = localStorage.getItem("token")

    const handleClose = () => setShow(false)
    const handleShow = () => {
        if (token) {
            setShow(true)
        }else{
            navigate('/login')
        }
    }

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

    return (
        <>
            <div>
                <Navbar bg="primary" variant='dark' expand="md">
                    <Container>
                        <Navbar.Brand><h2 style={{ color: 'orange' }}><b>e</b>-commerce</h2></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#/">Home</Nav.Link>
                                <Nav.Link href="#/purchases">Purchases</Nav.Link>
                                <Nav.Link as={Button} onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                                {
                                    token ? (
                                        <Nav.Link className='logout' as={Button} onClick={logout}>Logout</Nav.Link>
                                    ) : (
                                        <Nav.Link className='logout' href="#/login">Login</Nav.Link>
                                    )
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <CartSidebar show={show} handleClose={handleClose}/>
            </div>
        </>
    );
};

export default NavBar;