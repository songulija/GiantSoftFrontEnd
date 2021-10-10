import React from 'react'
import axios from 'axios'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Row, Col, NavDropdown } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

import Container from "react-bootstrap/Container";
import './Header.css'

// const api = axios.create({
//     baseURL: `https://localhost:44374/`
// })

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }
    async componentDidMount() {
        // Simple GET request using axios
        const response = await axios.get('api/categories');
        this.setState({
            categories: response.data,
        })
        console.log(this.state.categories)
    }
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">GiantSoft</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {this.state.categories.map((obj, index) => {
                                if (obj.parentId === null && obj.name !== "Accessories" && obj.id !== 3 && obj.id !== 2) {
                                    return (<NavDropdownMenu title={obj.name} key={obj.id} id="basic-nav-dropdown">
                                        {this.state.categories.map((obj1, index1) => {
                                            if (obj1.parentId === obj.id) {
                                                return (<NavDropdown.Item href="#action/3.2" key={obj1.id}>{obj1.name}</NavDropdown.Item>)
                                            }
                                        })}
                                    </NavDropdownMenu>)
                                }
                            })}
                            {/* Shoes */}
                            {this.state.categories.map((obj, index) => {
                                if (obj.id === 2) {
                                    return (<NavDropdownMenu title={obj.name} key={obj.id} id="basic-nav-dropdown">
                                        {this.state.categories.map((obj1, index1) => {
                                            if (obj1.parentId === obj.id) {
                                                return (<DropdownSubmenu href="#action/3.2" key={obj1.id} title={obj1.name}>
                                                    {this.state.categories.map((obj2, index) => {
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
                            {this.state.categories.map((obj, index) => {
                                if (obj.name === "Accessories") {
                                    return (<Nav.Link href="#link">{obj.name}</Nav.Link>)
                                }
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }

}

export default Header
