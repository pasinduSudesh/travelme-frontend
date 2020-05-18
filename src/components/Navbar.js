import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import '../css/navbar.css'

const Navbar = () =>{
    return(
        // <nav className="nav-wrapper red bg-darken-4">
        //     <div className="container">
        //         <a href="/" className="brand-logo">POkosTetUs</a>
        //         <ul className="right">
        //             <li><Link to="/">Home</Link></li>
        //             <li><NavLink to="/about">About</NavLink></li>
        //             <li><NavLink to="/Content">Content</NavLink></li>
        //         </ul>
        //     </div>
        // </nav>
<div>
            <div className="narbar-fixed">
        <nav className="teal darken-2">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo"><i className="large material-icons">beach_access</i>TravelME</a>
                    <a href="/" data-target="mobile-nav" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to="/" className="nav-items">Home</Link>
                        </li>
                        <li>
                            <NavLink to="/planTrip" className="nav-items">Trip Planer</NavLink>
                        </li>
                        <li>
                            <NavLink to="/places" className="nav-items">Places</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotels" className="nav-items">Hotels</NavLink>
                        </li>
                        <li>
                            <NavLink to="/taxi" className="nav-items">Taxi</NavLink>
                        </li>
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <ul className="sidenav" id="mobile-nav">
    <li>
      <a href="#home">Home</a>
    </li>
    <li>
      <a href="#search">Search</a>
    </li>
    <li>
      <a href="#popular">Popular Places</a>
    </li>
    <li>
      <a href="#gallery">Gallery</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>  
  </div>
    )
}

export default Navbar