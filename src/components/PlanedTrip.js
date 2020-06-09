import React, {Component}from 'react';
// import { makeStyles  } from '@material-ui/core/styles';

import axios from 'axios';
// import Button from '@material-ui/core/Button'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
// import '../css/place.css'
import '../css/tripPlan.css'
// import Places from './Places';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';





class PlanedTrip extends Component{

    state = {
        days:1,
        place:null,
        loading: false,
        trip:null,
        distances:null,
        errMsg:null,
        btnClicked:false
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
        if(this.state.btnClicked){
            this.setState({btnClicked:false})
        }else{
            this.setState({btnClicked:true})
        }

    }

    newTrip = () =>{
        this.props.newTrip();
    }
      

    render(){
        console.log(this.props);

        var facilities = facArray  =>{
            var facis = facArray.map((fac,i)=>(
                (i<2)?(<span key={i} className="new badge">{fac}</span>):(<div key={i} ></div>)
            ))
            return facis
        }

        var hotels = id =>{
            var h = this.props.state.hotelsInTrip.find(ha=>ha.id === id)
            if(h){

                var hotelDet = h.data.map((hotel,index)=>(
                    <div key={index}>
                      
                        <div className="col s12 m4">
                        <div className="card">
                            <div className="card-image img-sizing">
                            <img src={hotel.img} alt=""/>
                            <span className="card-title">{hotel.name}</span>
                            </div>
                            <div className="card-content">
                            {facilities(hotel.facilities)}
                            
                            </div>
                            <div className="card-action">
                            
                            <a href={hotel.hotelUrl} target="_blank" rel="noopener noreferrer" alt="">BOOKING DETAILS</a>
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

            placeDetails = this.props.state.tripPlaces.map((place,i)=>
            (
                
                
                <div key={place.placeId}>
                {(place.startTimeH === "09")?(<div className="center padd">
                    <button className="waves-effect waves-light btn" onClick={() => this.findNearestHotel(this.state.place,place.lat,place.lng,place.placeId)}>Find Hotel</button>
                    {(this.props.state.hotelsInTrip.length>0 && this.state.btnClicked)?(<div>{hotels(place.placeId)}</div>):(<div></div>)}
                </div>):(<div></div>)} 

                <div className="center padd">
                    {(place.startTimeH !== "09")?(
                        <div>
                            <button className="waves-effect waves-light btn" onClick={()=>window.open(`https://www.google.com/maps/dir/${this.props.state.tripPlaces[i-1].latLng}/${this.props.state.tripPlaces[i].latLng}`,'_blank')}>DISTANCE {Math.round(this.props.state.tripDistances[i-1].distance*100)/100} KM</button>
                        </div>
                        ):(<div></div>)}
                </div>

                <div  className="center-trip">     
                  
                    <div className="grid-a">
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
                                        <div ><button className="place-address-button" onClick={()=>window.open('https://www.google.com/maps/@6.015787,80.23823,10z','_blank')}>{place.address}</button></div>
                                        <div className="rating">Rating: {Math.round(place.rating*10)/10}</div>
                                        <div className="reviews">
                                           
                                            <p><strong>Best Review</strong></p>
                                            <p>{place.bestReview}</p>
                                            <Link to={`/placeDetails/${place.placeId}`}><button className="btn btn-small">MORE</button></Link>
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

{(this.props.state.customTripPlan)?(<div className="center padd">
                                <button className="btn btn-large padd-btn" onClick={()=>this.newTrip()}>New Trip</button>
                            </div>):(<div></div>)}

            {(this.props.state.loading)?(<div className="progress"><div className="indeterminate"></div></div>):(<div></div>)}

            {(this.props.state.errMsgPlace)?(<div>
                <div class="alert">
                    <strong>Error </strong> {this.props.state.errMsgPlace}
                </div>
            </div>):(<div>
        {/* if no error runn tis */}
       
        {(this.props.state.fetchedTripPlaceData)?(
            <section className="slider">
        <ul className="slides">
            <li>
                <img src={this.props.state.tripPlaces[0].img}  alt=""/>
                <div className="caption left-align">
               
                
                </div>
            </li>
            <li>
            <img src={this.props.state.tripPlaces[1].img} alt=""/>
                <div className="caption right-align">
                
                
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
                <h2>Plan Your Trip</h2>
                {/* <h5 className="light grey-text text-lighten-3 hide-on-small-only">Plan </h5> */}
                {/* <a href="/" className="btn btn-large">Learn More</a> */}
                </div>
            </li>
            <li>
                <img src="https://image.ibb.co/mbCVnH/resort3.jpg" alt=""/>
                <div className="caption left-align">
                <h2>Plan Your Trip</h2>
                {/* <h5 className="light grey-text text-lighten-3 hide-on-small-only">We can hire best taxi riders for you</h5> */}
                {/* <a href="/" className="btn btn-large">Learn More</a> */}
                </div>
            </li>
        </ul>
    </section>
           
        )}

        

    <section>
            {(this.props.state.loading)?(<div></div>):(<div>{placeDetails}</div>)}
    </section>
    
    
    </div>)}
    
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
        },
        newTrip : ()=>{
            dispatch({type:'RESET_TRIP'})
        }
        
    }
}

export default connect(getProps,getPlaceDet)(PlanedTrip)


// import React, {Component}from 'react';
// // import axios from 'axios';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

// import 'materialize-css/dist/css/materialize.min.css';
// // import M from 'materialize-css';
// // import '../css/home.css';
// import '../css/tripPlan.css';
// import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';

// class PlanedTrip extends Component{

//     state = {
//         btnClicked:false
//     }

//     findNearestHotel = (place,lat,lng,id)=>{
//         this.props.getNearestHotelDetails(place,lat,lng,id);
//         if(this.state.btnClicked){
//             this.setState({btnClicked:false})
//         }else{
//             this.setState({btnClicked:true})
//         }

//     }
//     render(){

//         console.log(this.props);

//         var facilities = facArray  =>{
//             var facis = facArray.map((fac,i)=>(
//                 (i<2)?(<span key={i} className="new badge">{fac}</span>):(<div></div>)
//             ))
//             return facis
//         }

//         var hotels = id =>{
//             var h = this.props.state.hotelsInTrip.find(ha=>ha.id === id)
//             if(h){

//                 var hotelDet = h.data.map((hotel,index)=>(
//                     <div key={index}>
                      
//                         <div className="col s12 m4">
//                         <div className="card">
//                             <div className="card-image">
//                             <img src={hotel.img} alt=""/>
//                             <span className="card-title">{hotel.name}</span>
//                             </div>
//                             <div className="card-content">
//                             {facilities(hotel.facilities)}
                            
//                             </div>
//                             <div className="card-action">
                            
//                             <a href={hotel.hotelUrl} target="_blank" rel="noopener noreferrer" alt="">BOOKING DETAILS</a>
//                             </div>
//                         </div>
//                         </div>
//                     </div>
    
                    
//                 ))
//                 return <div className="row">{hotelDet}</div>
                
//             }else{
//                 return (<div></div>)
//             }
//         }

//         var placeDetails = <div></div>

//         if ( ( this.props.state.customTripPlan)){

//             placeDetails = this.props.state.tripPlan.trip.map((place,i)=>
//             (
                
                
//                 <div key={place.placeId}>
//                 {/* {(place.startTimeH === "09")?(<div className="center padd">
//                     <button className="waves-effect waves-light btn" onClick={() => this.findNearestHotel(place.placeName,place.lat,place.lng,place.placeId)}>Find Hotel</button>
//                     {(this.props.state.hotelsInTrip.length>0 && this.state.btnClicked)?(<div>{hotels(place.placeId)}</div>):(<div></div>)}
//                 </div>):(<div></div>)}  */}

//                 <div className="center padd">
//                     {(place.startTimeH !== "09")?(
//                         <div>
//                             {/* <button className="waves-effect waves-light btn" onClick={()=>window.open(`https://www.google.com/maps/dir/${this.props.state.tripPlan.trip[i-1].latLng}/${this.props.state.tripPlan.trip[i].latLng}`,'_blank')}>DISTANCE {Math.round(this.props.state.tripDistances[i-1].distance*100)/100} KM</button> */}
//                         </div>
//                         ):(<div></div>)}
//                 </div>

//                 <div  className="center-trip">     
                  
//                     <div className="grid">
//                         <div className="time ">
//                             <div className="bold-text pad"><strong>From</strong></div>
//                             <div className="italic-text pad">{place.startTimeH} : {place.startTimeM}</div>
//                             <div className="bold-text pad"><strong>To</strong></div>
//                             <div className="italic-text pad">{place.endTimeH} : {place.endTimeM}</div>
//                         </div>
//                         <div className="placeImage img-boder">
//                             <img src={place.img} alt=""/>
//                         </div>
//                         <div className="place-details">
//                             <div className="heading-det">
//                                 <div className="place-name">{place.placeName}</div>
//                                 <div className="days">Day {place.day}</div>
//                                 <div>
//                                     <div className="details-det">
//                                         <div ><button className="place-address-button" onClick={()=>window.open('https://www.google.com/maps/@6.015787,80.23823,10z','_blank')}>{place.address}</button></div>
//                                         <div className="rating">Rating: {Math.round(place.rating*10)/10}</div>
//                                         <div className="reviews">
                                           
//                                             <p><strong>Best Review</strong></p>
//                                             <p>{place.bestReview}</p>
//                                             <Link to={`/placeDetails/${place.placeId}`}><button className="btn btn-small">MORE</button></Link>
//                                         </div>
//                                     </div>
//                                 </div> 
//                             </div>
//                         </div>
//                     </div>
//                 </div>
// </div>
   

// ))
// }else{
//     placeDetails = <div></div>
// }
//         return(
//             placeDetails
//             // <div>sdsss</div>
//         )
//     }
// }

// const getProps = (state)=>{
//     return{
//         state
//     }
// }

// const getPlaceDet = (dispatch) =>{
//     return{

//     }
// }


// export default connect(getProps,getPlaceDet) (PlanedTrip)