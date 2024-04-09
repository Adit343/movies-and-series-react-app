import React from 'react';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/video-player.png';
const HeaderComponent = ()=>{
    const navData = [
        {name:'Home', link:'/'},
        {name:'Movies', link:'/movies'},
        {name:'Tv Series', link:'/series'},
        {name:'Popular',link:'/popular'},
        {name:'UpComing', link:'/upcoming'},
        {name:'Search', link:'/search'},
       
    ]

    return (
        <header  className='header'>
            <Navbar bg="dark" expand="lg" >
                <Container>
                    <Navbar.Brand>
                        <img src={logo} alt='' className='nav-logo'/></Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbarScroll" className='nav-color'  /> 
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            navData.map((item)=>{
                                return (
                                    <Nav key={item.name}>
                                        <Link to={item.link}>{item.name}</Link>
                                    </Nav> 
                                )
                            })
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                    
        </header>
    )
}

export default HeaderComponent;