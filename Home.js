import React from "react";
import "./Home.css";
import {withRouter} from "react-router";
import Facebook from "../Facebook/Facebook"

import * as ReactBootStrap from "react-bootstrap"


class Home extends React.Component{
    render() {

        return (
            
            
            <div>
                <ReactBootStrap.Navbar bg="light" expand="lg">
  <ReactBootStrap.Navbar.Brand href="#home">N-tune</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
      <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href="/profile/:user">User Dashboard</ReactBootStrap.Nav.Link>
      
    </ReactBootStrap.Nav>
    
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>


                <h1> The Ultimate Music Lover Experience</h1>
                <h2>Get started now!</h2>
                <Facebook>

                </Facebook>

                

                
            </div>
            
            )
    }

};

export default withRouter(Home);