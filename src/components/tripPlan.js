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





class TripPlan extends Component{

    state = {
        days:1,
        place:null,
        loading: false,
        trip:null,
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
            this.setState({trip:response.data,loading:false});
        })
        .catch(err=>{
            this.setState({errMsg:"Error when getting data"})
        });
        
    }
      

    render(){


        var placeDetails = <div></div>

        if (! ( this.state.trip === null)){

            placeDetails = this.state.trip.map((place)=>(

            <div key={place.placeId} className="container">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image itemStyle">
                            <img src={place.img} className="fadeIn imgStyle" alt=""/>
                            
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                            <div className="row">
                                
                                <h5><i>Day {place.day} </i>  <strong>{place.placeName}</strong></h5>
                                

                            </div>
                            <p>Rating {place.positivePresentage} % </p>
                                {/* <p>{place.bestReview}</p> */}
                            </div>
                            {/* <div class="card-action">
                                <a href="/">This is a link</a>
                            </div> */}
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
