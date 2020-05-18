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
import {connect} from 'react-redux';





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
        console.log(this.props);
        this.props.getPlacesForTripPlan(this.state.days,this.state.place)

        const slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 400,
            transition: 500,
            interval: 6000
        });

        // this.setState({loading:true});
        // axios.post('https://noderestapp.azurewebsites.net/planTrip',{place:this.state.place,days:this.state.days})
        // .then(response=>{
        //     console.log(response)
        //     this.setState({trip:response.data.trip,distances:response.data.distances,loading:false});
        // })
        // .catch(err=>{
        //     this.setState({errMsg:"Error when getting data"})
        // });
        
    }

    findNearestHotel = (place,lat,lng,id)=>{
        this.props.getNearestHotelDetails(place,lat,lng,id);
    }
      

    render(){
        console.log(this.props);

        var hotels = id =>{
            var h = this.props.state.hotelsInTrip.find(ha=>ha.id === id)
            if(h){

                var hotelDet = h.data.map((hotel,index)=>(
                    <div key={index}>
                      
                        <div className="col s12 m4">
                        <div className="card">
                            <div className="card-image">
                            <img src={hotel.img} alt=""/>
                            <span className="card-title">{hotel.name}</span>
                            </div>
                            <div className="card-content">
                            <p>{hotel.address}</p>
                            </div>
                            <div className="card-action">
                            <a href="/" alt="">This is a link</a>
                            </div>
                        </div>
                        </div>
                    </div>
    
                    
                ))
                return <div className="row">{hotelDet}</div>
                
            }else{
                return (<div></div>)
            }
            

            
        }


        var placeDetails = <div></div>

        if ( ( this.props.state.fetchedTripPlaceData)){

            placeDetails = this.props.state.tripPlaces.map((place)=>
            (
                
                
                <div key={place.placeId}>
                {(place.startTimeH === 9)?(<div>
                    <button onClick={() => this.findNearestHotel(this.state.place,place.lat,place.lng,place.placeId)}>Find Hotel</button>
                    {(this.props.state.hotelsInTrip.length>0)?(<div>{hotels(place.placeId)}</div>):(<div></div>)}
                </div>):(<div></div>)} 

                <div  className="center-trip">     
                  
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
        
        
        {(this.props.state.fetchedTripPlaceData)?(
            <section className="slider">
        <ul className="slides">
            <li>
                <img src={this.props.state.tripPlaces[0].img} Style=" object-fit: cover" alt=""/>
                <div className="caption left-align">
                <h2>{this.props.state.tripNumberOfDays} Days in {this.props.state.tripCenterPoint}</h2>
                
                </div>
            </li>
            <li>
            <img src={this.props.state.tripPlaces[1].img} Style=" object-fit: cover" alt=""/>
                <div className="caption right-align">
                
                <h2>{this.props.state.tripNumberOfDays} Days in {this.props.state.tripCenterPoint}</h2>
                </div>
            </li>
        </ul>
    </section>

        ):(
            <section className="slider">
        <ul className="slides">
        <li>
                <img src="https://image.ibb.co/mbCVnH/resort3.jpg" alt=""/>
                <div className="caption right-align">
                <h2>Best taxis for hire</h2>
                <h5 className="light grey-text text-lighten-3 hide-on-small-only">We can hire best taxi riders for you</h5>
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
           
        )}

        

    <section>
            {(this.props.state.loading)?(<div>loading</div>):(<div>{placeDetails}</div>)}
    </section>
    
    
    
    
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
        getPlacesForTripPlan:(days,place) =>{
            dispatch({type:'PLAN_TRIP_BEFORE'})
            axios.post('https://noderestapp.azurewebsites.net/planTrip',{place:place,days:days})
            .then(response=>{
                if(response.status === 200){
                    dispatch({type:'PLAN_TRIP_GOT',payload:response.data,placeName:place.toUpperCase(),numOfDays:days})
                }else{
                    dispatch({type:'PLAN_TRIP_ERROR',payload:'Error when fetching backend API'})
                }                
            })
            .catch(err=>{
                dispatch({type:'PLAN_TRIP_ERROR',payload:err.message})
            });
        },

        getNearestHotelDetails:(place,lat,lng,id) =>{
            dispatch({type:'FIND_NEAREST_HOTEL_BEFORE'})
            axios.post('https://noderestapp.azurewebsites.net/nearestHotels',{place:place,lat:lat,lng:lng})
            .then(response=>{
                if(response.status === 200){
                    dispatch({type:'FIND_NEAREST_HOTEL_GOT',payload:response.data,placeId:id})
                }else{
                    dispatch({type:'FIND_NEAREST_HOTEl_ERROR',payload:'Error when fetching backend API'})
                }                
            })
            .catch(err=>{
                dispatch({type:'FIND_NEAREST_HOTEl_ERROR',payload:err.message})
            });
        }
        
    }
}

export default connect(getProps,getPlaceDet)(TripPlan)
