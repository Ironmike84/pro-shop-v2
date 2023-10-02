import React from 'react';
import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Slices/authSlice';
import { useLogoutMutation } from '../Slices/usersSlice';
import logo from '../assets/Images/logo.png';

function Header() {
    const { cartItems } = useSelector((state)=> state.cart)
    const { userInfo } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [ logoutApiCall ] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <header>
        <Navbar bg="dark" variant='dark' expand='md' collapseOnSelect>
            <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                        <img src={logo} alt='ProShop'></img>
                        ProShop</Navbar.Brand>
                    </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link href='/cart'><FaShoppingCart/>Cart
                            {cartItems.length > 0 && (
                            <Badge pill='success' style={{marginLeft: "5px"}}>
                                {cartItems.reduce((acc, curr)=> acc + curr.qty, 0)}
                                </Badge>)}
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ):(  <LinkContainer to='/login'>
                            <Nav.Link href='/login'><FaUser/>Sign In</Nav.Link>
                        </LinkContainer>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    </>
    )
}

export default Header
