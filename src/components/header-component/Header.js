import React,{useEffect,useCallback,useState} from 'react'
import axios from 'axios'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, NavDropdown, Button } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/usersActions';
import Container from "react-bootstrap/Container";
import './Header.css'

// const api = axios.create({
//     baseURL: `https://localhost:44374/`
// })

function Header() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    //check if user is logged in. getting  userLogin state
    const userLogin = useSelector((state) => state.userLogin);

    const fetchData = useCallback(async () => {
        let response = await axios.get('/api/categories');
        setCategories(response.data);
    }, []);
    const logoutHandler = ()=>{
        dispatch(logout);
        console.log('Logout')
    }
    // if fetchData is changed it will trigger useEffect again
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">GiantSoft</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {categories.map((obj, index) => {
                            if (obj.parentId === null && obj.name !== "Accessories" && obj.id !== 3 && obj.id !== 2) {
                                return (<NavDropdownMenu title={obj.name} key={obj.id} id="basic-nav-dropdown">
                                    {categories.map((obj1, index1) => {
                                        if (obj1.parentId === obj.id) {
                                            return (<NavDropdown.Item href="#action/3.2" key={obj1.id}>{obj1.name}</NavDropdown.Item>)
                                        }
                                    })}
                                </NavDropdownMenu>)
                            }
                        })}
                        {/* Shoes */}
                        {categories.map((obj, index) => {
                            if (obj.id === 2) {
                                return (<NavDropdownMenu title={obj.name} key={obj.id} id="basic-nav-dropdown">
                                    {categories.map((obj1, index1) => {
                                        if (obj1.parentId === obj.id) {
                                            return (<DropdownSubmenu href="#action/3.2" key={obj1.id} title={obj1.name}>
                                                {categories.map((obj2, index) => {
                                                    if (obj2.parentId === obj1.id) {
                                                        return (<NavDropdown.Item href="#action/9.1" key={obj2.id}>{obj2.name}</NavDropdown.Item>)
                                                    }
                                                })}
                                            </DropdownSubmenu>)
                                        }
                                    })}
                                </NavDropdownMenu>)
                            }
                        })}
                        {/* Accessories */}
                        {categories.map((obj, index) => {
                            if (obj.name === "Accessories") {
                                return (<Nav.Link href="#link">{obj.name}</Nav.Link>)
                            }
                        })}
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>
                        </LinkContainer>

                        {userLogin.userInfo ? (
                            <Button onClick={logoutHandler}>Logout</Button>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )


}

export default Header
