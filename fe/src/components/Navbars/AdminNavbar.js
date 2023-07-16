
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { MDBIcon } from 'mdb-react-ui-kit';
import routes from "routes.js";

function Header() {
    const location = useLocation();
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        console.log(113);
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };
// console.log(routes);
    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {

            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    {/* <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </Button> */}
                    <Navbar.Brand
                        href="/dashboard"
                        onClick={(e) => {
                            e.preventDefault()
                            // window.location.href = '/admin/dashboard'
                            }
                        }
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
               
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="ml-auto" navbar>
                        <Nav.Item>
                            {/* <MDBIcon fas icon="user-circle" style={{width: "30px", fontSize: "20px"}} /> */}
                            <span>Hi, {localStorage.getItem("fullName")}!</span>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={(e) => {
									localStorage.clear();
									window.location.href = '/login';
								}}
                            >
                                <span className="no-icon">Đăng xuất</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
