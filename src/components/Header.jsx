import React from 'react';
import { useAuth } from './AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import apple from '../assets/apple.webp'
const Header = () => {
  const { user } = useAuth();

  if (user && Object.keys(user).length !== 0) {
    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/">
            <Navbar.Brand>XMR</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/">
                <Nav.Link as="span">Bosh sahifa</Nav.Link>
              </NavLink>
              {user.username ? (
                <Link to="/profile">
                  <div style={{
                
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
<img style={{
  top: "10px",
  width: '50px',
  height: '45px',
  borderRadius: '50%',
 
}} src={apple} alt="" />
                  <Nav.Link style={{
marginTop:"-5px",
                  }} as="span">{user.username}</Nav.Link>
                  </div>
                </Link>
              ) : (
                <NavLink to="/login">
                  <Nav.Link as="span">Kirish</Nav.Link>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return null;
};

export default Header;