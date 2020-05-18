import React, {Component}from 'react';
// import { makeStyles  } from '@material-ui/core/styles';

import axios from 'axios';
// import Button from '@material-ui/core/Button'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import '../css/place.css'
import '../css/tripPlan.css'
// import Places from './Places';





class TripPlan extends Component{

    state = {
        days:1,
        place:null,
        loading: false,
        trip:null,
        distances:null,
        errMsg:null
    }

    componentDidMount(){
        const slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 250,
            transition: 500,
            interval: 6000
        });
    }
    up = (e)=>{
        this.setState({
            days: this.state.days + 1
        })
        if(this.state.days === 7){
            this.setState({
                days: 7
            })
        }
    }
    down = (e) =>{
        this.setState({
            days: this.state.days - 1
        })
        if(this.state.days === 1){
            this.setState({
                days: 1
            })
        }
    }
    changePlaceHandler = (e) =>{
        this.setState({place:e.target.value});
        
    }
    planTrip = e =>{
        this.setState({loading:true});
        axios.post('https://noderestapp.azurewebsites.net/planTrip',{place:this.state.place,days:this.state.days})
        .then(response=>{
            console.log(response)
            this.setState({trip:response.data.trip,distances:response.data.distances,loading:false});
        })
        .catch(err=>{
            this.setState({errMsg:"Error when getting data"})
        });
        
    }
      

    render(){


        var placeDetails = <div></div>

        if (! ( this.state.trip === null)){

            placeDetails = this.state.trip.map((place)=>
            (
                

            

                <div key={place.placeId} className="center-trip">        
                    <div className="grid">
                        <div className="time ">
                            <div className="bold-text pad"><strong>From</strong></div>
                            <div className="italic-text pad">{place.startTimeH} : {place.startTimeM}</div>
                            <div className="bold-text pad"><strong>To</strong></div>
                            <div className="italic-text pad">{place.endTimeH} : {place.endTimeM}</div>
                        </div>
                        <div className="placeImage img-boder">
                            <img src={place.img} alt=""/>
                        </div>
                        <div className="place-details">
                            <div className="heading-det">
                                <div className="place-name">{place.placeName}</div>
                                <div className="days">Day {place.day}</div>
                                <div>
                                    <div className="details-det">
                                        <div ><button className="place-address-button" onClick={()=>window.open('https://www.google.com/maps/dir/6.015787,80.23823/6.0186944,80.23941/@6.0172408,80.237756,10z','_blank')}> Chinthmaniya Watta, Pilana, Angulugaha.</button></div>
                                        <div >rating: {place.rating}</div>
                                        <div>
                                            <p><strong>Best Review</strong></p>
                                            <p>{place.bestReview}</p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

   

))
}else{
    placeDetails = <div></div>
}
        
        
        return(<div>

                <section id="search" className="section section-search teal darken-1 white-text center scrollspy">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <div className="input-field">
                                    <div className="row">
                                        <div className="col s12 m8">
                                        <label className="place-labal">Destination</label>
                                            <input className="white grey-text autocomplete" placeholder="Polonnaruwa, Galle, Sigiriya..." type="text" onChange={this.changePlaceHandler}id="autocomplete-input"/>
                                        </div>
                                    <div className="col s12 m4">
                                        <label className="place-labal">Days {this.state.days}</label>
                                        <button className="btn btn-small" onClick={this.up}><i className="large material-icons">arrow_upward</i></button> 
                                        <button className="btn btn-small" onClick={this.down}><i className="large material-icons">arrow_downward</i></button> 
                                    </div>  
                                </div>                   
                            </div>
                        <button className="btn btn-large" onClick={this.planTrip}>search</button>

                    </div>
                </div>
                </div>
            </section>
        
        
        
        <section className="slider">
        <ul className="slides">
            <li>
                <img src="https://image.ibb.co/mn1egc/resort2.jpg" alt=""/>
                <div className="caption left-align">
                <h2>Best places for stay</h2>
                <h5 className="light grey-text text-lighten-3 hide-on-small-only">We can mention best hotels in your traveling area</h5>
                <a href="/" className="btn btn-large">Learn More</a>
                </div>
            </li>
            <li>
                <img src="https://image.ibb.co/mbCVnH/resort3.jpg" alt=""/>
                <div className="caption right-align">
                <h2>Best taxis for hire</h2>
                <h5 className="light grey-text text-lighten-3 hide-on-small-only">We can hire best taxi riders for you</h5>
                <a href="/" className="btn btn-large">Learn More</a>
                </div>
            </li>
        </ul>
    </section>

    <section>
            {(this.state.loading)?(<div>loading</div>):(<div>{placeDetails}</div>)}
    </section>
    
    
    
    
    </div>

        )

       
    }
}

export default TripPlan
