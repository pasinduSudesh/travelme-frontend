import React, {Component}from 'react';
import { Link , NavLink} from 'react-router-dom';
import '../css/navbar.css'
// import axios from 'axios';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';

class Navbar extends Component{

    state = {
        email:false,
        name:false
    }
    responseGoogle = (response) =>{
        console.log(response)
        this.setState({email:response.profileObj.email})
        this.setState({name:response.profileObj.givenName})
        this.props.login(this.state.email,response.profileObj.givenName);
    }
    render(){
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
            <div className="navbar-fixed">

        <nav className="teal darken-2">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo"><i className="large material-icons">beach_access</i>TravelME</a>
                    <a href="/" data-target="mobile-nav" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <div className="right">
                        {/* <button className="btn btn-small white">LogIn</button> */}
                        <GoogleLogin  
                            clientId="1008932353060-je8amtlpk0i9uhnivtkj3j7drfhb218p.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        
                        
                    </div>                
                    <div>{(this.state.email)?(<div>
                        <div className="float-button-name">{this.state.name}</div>
                        <div className="float-button-email">{this.state.email}</div></div>
                    ):(<div></div>)}</div>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to="/" className="nav-items">Home</Link>
                        </li>
                        <li>
                            <NavLink to="/planTrip" className="nav-items">Trip Planer</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customTripPlan" className="nav-items">Custom Trip</NavLink>
                        </li>
                        <li>
                            <NavLink to="/places" className="nav-items">Places</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotels" className="nav-items">Hotels</NavLink>
                        </li> 
                        <li>
                            <NavLink to="/MyTrips" className="nav-items">My Trips</NavLink>
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
}}

const getProps = (state)=>{
    return{
        state
    }
}

const getPlaceDet = (dispatch) =>{
    return {
        login: (email,username)=>{
            dispatch({type:'LOGGED_IN_USER',payload:email,username:username})
        }
    }
}
export default connect(getProps,getPlaceDet) (Navbar)