
import React, { useEffect, useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { checkLocalStorageAuth } from '../Function/StorageFunction';

export default function Header() {

    useEffect(() => {

        if (checkLocalStorageAuth().auth) {
            setAuth(true)
            if (checkLocalStorageAuth().data.role === 'admin') {
                setAdmin(true)
            }
        }

    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const x = () => { }

    return (
        <div>
            <Navbar className='py-3 myNavbar' color="dark" dark expand="md">
                <NavbarBrand className='navBrand' href="/">O T R S</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>

                        {admin ? <>
                            <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={'/add-route'}><NavLink className='navLi'>Route</NavLink></Link>
                            </NavItem>
                            <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={'/approved'}><NavLink className='navLi'>Approved</NavLink></Link>
                            </NavItem>
                            <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={'/pending'}><NavLink className='navLi'>Pending</NavLink></Link>
                            </NavItem>

                            <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={'/logout'}><NavLink className='navLi'>Logout</NavLink></Link>
                            </NavItem>





                        </> : <>


                            <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={auth ? '/ticket' : '/signin'}><NavLink className='navLi'>Ticket</NavLink></Link>
                            </NavItem>

                            {/* <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                <Link className='text-decoration-none' to={'/contact'}><NavLink className='navLi'>Contact</NavLink></Link>
                            </NavItem> */}
                            {auth ? <>
                                <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                    <Link className='text-decoration-none' to={'/Profile'}><NavLink className='navLi'>Profile</NavLink></Link>
                                </NavItem>
                                <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                    <Link className='text-decoration-none' to={'/logout'}><NavLink className='navLi'>Logout</NavLink></Link>
                                </NavItem>

                            </> : <>
                                <NavItem onClick={window.innerWidth <= 768 ? toggle : x}>
                                    <Link className='text-decoration-none' to={'/signin'}><NavLink className='navLi'>Login</NavLink></Link>
                                </NavItem>
                            </>}

                        </>}



                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
