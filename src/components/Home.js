import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import '../css/home.css'
import {connect} from 'react-redux';


class Home extends Component{

    state = {
        name:"",
        place:'',
        review:'',
        reviewMsg:false,
        addReviewLoading:false,
        bestplaces:null
    }

    
    changeHandeler = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    submitHandler = e =>{
        e.preventDefault();
        console.log(this.state,"aaaaa");
        if(this.state.name.length>0 && this.state.place.length>0 && this.state.review.length>0){
            this.setState({
                addReviewLoading:true
            })
            console.log(this.state,"bbbbb");
            axios.post('https://noderestapp.azurewebsites.net/addReview',{name:this.state.name,place:this.state.place,review:this.state.review})
            .then(response =>{
                console.log(response.data)
                if (response.data){
                    this.setState({
                        name:"",
                        place:"",
                        review:"",
                        reviewMsg:response.data.message,
                        addReviewLoading:false,
                        })
                } 
            }).catch(error =>{
                console.log(error);
            })
        }else{
            this.setState({
                reviewMsg:"Please Enter Values"
            })
        }
    }

    

    componentDidMount(){
        //getting best places 
        // this.props.getBestPlaces();

        const slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 400,
            transition: 500,
            interval: 6000
        });

        const ss = document.querySelectorAll('.scrollspy');
        M.ScrollSpy.init(ss, {});

        const ac = document.querySelector('.autocomplete');
        M.Autocomplete.init(ac, {
            data: {
              "Aruba": null,
              "Cancun Mexico": null,
              "Hawaii": null,
              "Florida": null,
              "California": null,
              "Jamaica": null,
              "Europe": null,
              "The Bahamas": null,
            }
        });

        
    }

    componentWillMount(){
        
        this.props.getBestPlaces();     

    }

    render(){
        const {name, place,review} = this.state

        // this.props.getBestPlaces();
        // console.log(this.props.state);
        return(
            <div>
            {/* slider start */}
              <section className="slider">
                <ul className="slides">
                    <li>
                        <img src="https://image.ibb.co/hbEMux/resort1.jpg" alt=""/>
                        <div className="caption center-align">
                        <h2>Plan Your Trip</h2>
                        <h5 className="light grey-text text-lighten-3 hide-on-small-only">Let us plan your trip with the best places</h5>
                        <a href="/places" className="btn btn-large">Learn More</a>
                        </div>
                    </li>
                    <li>
                        <img src="https://image.ibb.co/mn1egc/resort2.jpg" alt=""/>
                        <div className="caption left-align">
                        <h2>Best Hotels for Stay</h2>
                        <h5 className="light grey-text text-lighten-3 hide-on-small-only">We can mention best hotels in your traveling area</h5>
                        <a href="/hotels" className="btn btn-large">Learn More</a>
                        </div>
                    </li>
                    <li>
                        <img src="https://image.ibb.co/mbCVnH/resort3.jpg" alt=""/>
                        <div className="caption right-align">
                        <h2>Customize Your Trip</h2>
                        <h5 className="light grey-text text-lighten-3 hide-on-small-only">You can customize your trip with your favourite places</h5>
                        <a href="/customTripPlan" className="btn btn-large">Learn More</a>
                        </div>
                    </li>
                </ul>
            </section>
            {/* slider end */}
            {/* search start */}
            {/* <section id="search" className="section section-search teal darken-1 white-text center scrollspy">
                <div className="container">
                <div className="row">
                    <div className="col s12">
                    <h3>Search Destinations</h3>
                    <div className="input-field">
                        <div className="row">
                        <div className="col s12 m8">
                        <label className="place-labal">Destination</label>
                        <input className="white grey-text autocomplete" placeholder="Polonnaruwa, Galle, Sigiriya..." type="text" id="autocomplete-input"/>
                        </div>
                        <div className="col s12 m4">
                        <label className="place-labal">Days</label>
                        <input className="white grey-text autocomplete" placeholder="" type="text" id="autocomplete-input"/>
                        </div>  
                        </div>                   
                    </div>
                    <a href="/planTrip" className="btn btn-large">search</a>

                    </div>
                </div>
                </div>
            </section> */}
            {/* search end */}
            {/* icon box start */}
            <section className="section section-icons grey lighten-4 center">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6">
                        
                        <div className="card-panel">
                            <i className="material-icons large teal-text">room</i>
                            <h4>Places</h4>
                            <p>Find best places to visit & enjoy the nature</p>
                            <a href="/places" className="btn btn-small">Learn More</a>    
                        </div>
                        
                        </div>
                        <div className="col s12 m6">
                        <div className="card-panel">
                            <i className="material-icons large teal-text">store</i>
                            <h4>Hotels</h4>
                            <p>Find best hotels with best hospitality</p>
                            <a href="/hotels" className="btn btn-small">Learn More</a>   
                        </div>
                        </div>
                        {/* <div className="col s12 m4">
                        <div className="card-panel">
                            <i className="material-icons large teal-text">time_to_leave</i>
                            <h4>Taxi</h4>
                            <p>Find taxis for reach your destinations</p>
                            <a href="/customTripPlan" className="btn btn-small">Learn More</a>   
                        </div>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* icon box ends */}
            {/* start best places */}
            
            <section id="popular" className="section section-popular scrollspy">
                <div className="container">
                    <div className="row">
                        <h4 className="center">
                        <span className="teal-text">Popular</span> Places</h4>
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image crad-i">
                                    {/* <img src="https://image.ibb.co/hbEMux/resort1.jpg" alt=""/> */}
                                    <img src={this.props.state.bestPlaces[0].img} alt=""/>
                                    <span className="card-title">{this.props.state.bestPlaces[0].place}</span>
                                </div>
                                <div className="card-content card-c">
                                    <p>{this.props.state.bestPlaces[0].description}</p>

                                    {/* <img class="_34fe7l16" src="https://media.tacdn.com/media/attractions-splice-spp-360x240/06/75/64/19.jpg" alt="Day tour to Sigiriya &amp; Dambulla from Kandy by Aaliya Tou</img>rs"> */}
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image crad-i">
                                    <img src={this.props.state.bestPlaces[1].img} alt=""/>
                                    <span className="card-title">{this.props.state.bestPlaces[1].place}</span>
                                </div>
                                <div className="card-content card-c">
                                    <p>{this.props.state.bestPlaces[1].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-image crad-i">
                                    <img src={this.props.state.bestPlaces[2].img} alt=""/>
                                    <span className="card-title">{this.props.state.bestPlaces[2].place}</span>
                                </div>
                                <div className="card-content card-c">
                                    <p>{this.props.state.bestPlaces[2].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="row">
                <div className="col s12 center">
                    <a href="/places" className="btn btn-large grey darken-3">
                        <i className="material-icons left">send</i> See best Places
                    </a>
                </div>
            </div>
            </div>
            </section>
            
            {/* best places end */}
            {/* start follow us */}
            <section className="section section-follow teal darken-2 white-text center">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h4>Follow TravelMe</h4>
                            <p>Follow us on social media for special offers</p>
                            <a href="htttps://facebook.com"  className="white-text">
                                {/* <FontAwesomeIcon icon={['fab', 'apple']}/> */}
                            </a>
                            <a href="htttps://twitter.com"  className="white-text">
                                <i className="fab fa-twitter fa-4x"></i>
                            </a>
                            <a href="htttps://linkedin.com"  className="white-text">
                                <i className="fab fa-linkedin fa-4x"></i>
                            </a>
                            <a href="htttps://googleplus.com"  className="white-text">
                                <i className="fab fa-google-plus fa-4x"></i>
                            </a>
                            <a href="htttps://pinterest.com"  className="white-text">
                                <i className="fab fa-pinterest fa-4x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* follow section end */}
            {/* photo gallery section start */}

            <section id="gallery" className="section section-gallery scrollspy">
                <div className="container">
                    <h4 className="center">
                        <span className="teal-text">Photo </span> Gallery
                    </h4>
                    <div className="row">
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?polonnaruwa" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?galle" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?colombo" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?matara" alt=""/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?anuradhapura" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?jaffna" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?ampara" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?rathnapura" alt=""/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?badulla" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?galle" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?hikkaduwa" alt=""/>
                        </div>
                        <div className="col s12 m3">
                        <img className="materialboxed responsive-img" src="https://source.unsplash.com/1600x900/?waterfall" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            {/*  photo gallery ends*/}
            {/* form start */}
            <section id="contact" className="section section-contact scrollspy">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6">
                              <div className="card-panel teal white-text center">
                                <i className="material-icons medium">email</i>
                                <h5>Are you travel anywhere?</h5>
                                <p>Pleace tell us about your tour. It help others to fine best places for travel</p>
                            </div> 
                            {/* <ul className="collection with-header">
                                <li className="collection-header">
                                <h4>Location</h4>
                                </li>
                                <li className="collection-item">Travelville Agency</li>
                                <li className="collection-item">555 Beach rd, Suite 33</li>
                                <li className="collection-item">Miami FL, 55555</li>
                            </ul>  */}
                        </div>
                        <div className="col s12 m6">
                            <div className="card-panel grey lighten-3">
                            <form onSubmit={this.submitHandler}>
                                {(this.state.reviewMsg)?(<h5>{this.state.reviewMsg}</h5>):(<h5>Add Review For Places</h5>)}
                                
                                <div className="input-field">
                                    <input type="text" placeholder="Your Name" id="reviewName" name="name" value={name} onChange={this.changeHandeler}/>
                                    <label for="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" placeholder="Place Name" id="reviewPlaceName" name="place" value={place} onChange={this.changeHandeler}/>
                                    <label for="place">Place</label>
                                </div>
                                {/* <div className="input-field">
                                    <input type="text" placeholder="Phone" id="phone"/>
                                    <label for="phone">Phone</label>
                                </div> */}
                                <div className="input-field">
                                    <textarea className="materialize-textarea" placeholder="Enter Your Idea about place" id="message" name="review" value={review} onChange={this.changeHandeler}></textarea>
                                    <label for="message">Reviews</label>
                                </div>
                                
                                {(this.state.addReviewLoading)?(
                                    <div className="row">
                                <div className="preloader-wrapper small active">
                                        <div className="spinner-layer spinner-green-only">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                ):(<div></div>)}
                                
                                
                                <input type="submit" value="Submit" className="btn"/>
                                
        
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* form ends */}
            {/* footer start */}
            
        </div>
        )
    }
}


const getProps = (state)=>{
    return{
        state
    }
}


const getPlaceDet = (dispatch) =>{
    return {
        getBestPlaces: () => {
            dispatch({type:'GET_BEST_PLACES_BEFORE'})
            axios.get(`https://noderestapp.azurewebsites.net/bestPlaces`)
            .then( response=>{
                if(response.status ===  200){
                    dispatch({type:'GET_BEST_PLACES_RECEIVED',payload:response.data.bestPlaces})
                }else{
                    dispatch({type:'GET_BEST_PLACES_ERROR',payload:'Error when fetching backend API'})
                }
            })
            .catch(err=>{
                dispatch({type:'GET_BEST_PLACES_ERROR',payload:err.message})
            })
        }
    }
}

export default connect(getProps,getPlaceDet) (Home)