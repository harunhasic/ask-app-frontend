  
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/header/Header.scss';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { isTokenValid, removeSession } from '../../utils/LocalStorage/LocalStorage';
import { useHistory } from "react-router";
import { home,registerUrl, loginUrl, myProfileUrl } from '../../utils/redirect/RedicertUrls';
import * as qs from 'query-string';

export const getUserMail = () => {
    const user = localStorage.getItem('askapp-user');
    return user ? JSON.parse(user).email : null;
}

const Header = ({ loggedInState }) => {

    const history = useHistory();

    const [isLoggedIn, setLoggedIn] = useState(isTokenValid());


    const toHome = () => {
       history.push('/');   
    }   

    const handleLogout = () => {
        setLoggedIn(false);
        removeSession();
        toHome();
    };

    useEffect(() => {
        if (loggedInState === false)
            setLoggedIn(!isLoggedIn);
    }, [loggedInState]);
  
    return (
    <div>
        <div className="header-container">
        {isLoggedIn ?
        (
            <div className="socials-container">
                <Link className="header-text" to="/questions/new">
                    Post a new Question
                </Link>
            </div>
            ) : (
            <div>   
            </div>
            )}
            <Nav>
                {isLoggedIn ?
                    (
                        <div>
                            <div className="row">
                                <div className="welcome-msg">Welcome,</div> 
                                <div className="name-msg">{getUserMail()}</div>                           
                                <Dropdown className="col">
                                    <Dropdown.Toggle
                                        size="sm"
                                        variant="secondary"
                                        id="dropdown-split-basic"
                                        className="dropdown-arrow"
                                    >
                                    
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu">
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ) :
                    (
                        <div>
                            <div className="login-account">
                                <Link className="header-text" to="/login">
                                    Login
                                </Link>
                                <Navbar.Text className="header-or">
                                    or
                                </Navbar.Text>
                                <Link className="header-text" to="/register">
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    )}
            </Nav>
        </div>

        <div className="lower-header-container">
            <div className="col-md-4">
                      
            <Nav>
            <NavLink
                        isActive={(match, location) => (match.isExact || location.pathname === loginUrl || location.pathname === registerUrl)}
                        className="dark-nav-link nav-link"
                        activeClassName="dark-active-nav-link"
                        to={home}
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        className={"black-nav-link nav-link"}
                        activeClassName="black-active-nav-link"
                        to={myProfileUrl}
                    >
                        MY ACCOUNT
                    </NavLink>
            </Nav>
         
            </div>
        </div>
    </div>
);
}

export default Header;