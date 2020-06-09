import React, {Component}from 'react';
import axios from 'axios';
// import M from 'materialize-css';
import '../css/customTripPlan.css'
import '../css/tripPlan.css'
import {connect} from 'react-redux';

import PlanedTrip from './PlanedTrip'
import { Link } from 'react-router-dom';

class CustomTrip extends Component{

    state = {
        searchPlace:"",
        errMsg:false
    }

    changeHandler = (e) =>{
        this.setState({searchPlace:e.target.value});
    }

    submitHandler = (e) =>{
        e.preventDefault()
        if(this.state.searchPlace.length > 0){
            this.props.getPlaces(this.state.searchPlace);
            this.setState({errMsg:false})
        }else{
            this.setState({errMsg:"Please Add Search Palce Name."})
        }
        console.log(this.props.state)
    }

    addPlace2Array = (place) => {
        var ss = this.props.state.customTripPlaceArrray.filter(a=>{
            return (a.placeId === place.placeId)
        })
        if(ss.length === 0){
            this.props.addPlaceToArray(place)
        }
    }
    hasPlaceInArray = (place) =>{
        var ss = this.props.state.customTripPlaceArrray.filter(a=>{
            return (a.placeId === place.placeId)
        })
        if(ss.length>0){
            return true;
        }else{
            return false;
        }
    }

    removePlaceFromArray = (place) =>{
        this.props.removePlace(place)
    }

    custopTripPlan = () =>{
        var ids = []
        this.props.state.customTripPlaceArrray.forEach(i=>{
            ids.push(i.placeId)
        })
        this.props.customTripPlan(ids,this.props.state.loggedEmail);
    }

    render() {
        console.log(this.props.state)
        var searchPlaces = <div></div>
        if(this.props.state.customTripSearchPlaces && this.props.state.customTripSearchPlaces.length>0){
            searchPlaces = this.props.state.customTripSearchPlaces.map((p,i)=>(
                <div key={i} className="col s12 m7">                
                <div className="card horizontal">
                  <div className="card-image img-sizing">
                    <img src={p.img} alt=""/>
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                    <p><strong>{p.placeName}</strong></p>
                    <p className="address"><i className="material-icons tiny">location_on</i>{p.address}</p>
                    <Link to={`/placeDetails/${p.placeId}`}><button className="btn btn-small btn-mr">MORE</button></Link>
                    </div>
                    <div className="card-action">
                      {(this.hasPlaceInArray(p))?(
                          <div>
                            <button className="btn btn-small red" onClick={()=>this.removePlaceFromArray(p)}>Remove Form My Trip</button>
                          </div>
                      ):(
                          <div>
                            <button className="btn btn-small" onClick={()=>this.addPlace2Array(p)}>Add To My Trip</button>
                          </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            ))
        }
        var placeArray = <div></div>
        
        if(this.props.state.customTripPlaceArrray.length > 0){
            placeArray = this.props.state.customTripPlaceArrray.map( (p,i) =>(
                <div key={i}>                  
                    
                    <div className="img-place-cart b">
                    <img src={p.img} alt=""/>                        
                    </div>
                    <p >{p.placeName}</p>
                    <button className="btn btn-small red" onClick={()=>this.removePlaceFromArray(p)}>X</button>
                    

                </div>
    //             <div class="card horizontal">
    //   <div class="card-image">
    //     <img src="https://lorempixel.com/100/190/nature/6" alt=""/>
    //   </div>
    //   <div class="card-stacked">
    //     <div class="card-content">
    //       <p>I am a very simple card. I am good at containing small bits of information.</p>
    //     </div>
    //     <div class="card-action">
    //       <a href="/">This is a link</a>
    //     </div>
    //   </div>
    // </div>
            ))
        }

        return (
            <div>
                <section>
                    {/* THIS SECTION FOR PLACE ARRAY */}
                    <div className="grid-place-cart">
                        {placeArray}
                    </div>
                </section>
                {/* this sectin for search places */}
                <section>
                <div className="topnav-w3 search-bar-container">
                    {(this.props.state.customTripPlaceArrray.length > 0)?(
                        <div className="search-bar">
                            Search Places For Plan Your Trip  
                            <button className="btn btn-large padd-btn" onClick={()=>this.custopTripPlan()}>PLAN TRIP</button>
                            Estimated Days {Math.floor(this.props.state.customTripPlaceArrray.length/4)+1}
                            
                        </div>
                    ):(
                        <div className="search-bar">
                            Search Places For Plan Your Trip  
                        </div>
                    )}
                    
                    <div className="search-container-w3">
                        <form onSubmit={this.submitHandler}>
                            <div className="section-search">
                            <input  type="text" placeholder="Search.." name="search" onChange={this.changeHandler}/>
                            <button type="submit"><i className="material-icons" >search</i></button>
                            </div>
                    </form>
                    </div>
                </div>
                </section>
                <section>
                    {/* THIS SECTION FOR SHOW ERROR MSG */}
                    {(this.props.state.customTripPlaceErr)?(
                        <div className="alert">
                        <strong>Error</strong> {this.props.state.customTripPlaceErr}
                    </div>
                    ):(
                        <div></div>
                    )}
                    
                </section>
                
                <section>
                    {(this.props.state.customTripPlan)?(
                        <div><PlanedTrip/></div>
                        ):(
                            <div>
                                {(this.props.state.loadingCustomTripPlace)?(
                                    <div className="progress"><div className="indeterminate"></div></div>
                                ):(<div></div>)}
                                {(this.props.state.fetchedCustomTripPlace)?(
                                    <div className="grid">
                                        {searchPlaces}
                                    </div>
                                ):(<div></div>)}
                                
                            </div>
                            )}
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

const dispatchProps = (dispatch) =>{
    return {
        getPlaces: (placeName)=>{
            dispatch({type:'GET_PLACE_FOR_CUSTOM_TRIP_BEFORE'});
            axios.get(`https://noderestapp.azurewebsites.net/getPlace/${placeName}`)
            .then(response=>{
                console.log(response)
                if(response.status === 200){
                    dispatch({type:'GET_PLACE_FOR_CUSTOM_TRIP_RECEIVED',payload:response.data})
                }else{
                    dispatch({type:'GET_PLACE_FOR_CUSTOM_TRIP_ERROR',payload:'Error when getting data'})
                }
            })
            .catch(err=>{
                console.log(err.response?.status)
                if(err.response?.status === 400){
                    dispatch({type:'GET_PLACE_FOR_CUSTOM_TRIP_ERROR',payload:err.response.data.error.message})

                }else{
                    dispatch({type:'GET_PLACE_FOR_CUSTOM_TRIP_ERROR',payload:err.message})
                }
            })
        },
        addPlaceToArray : (place) =>{
            dispatch({type:'APPEND_PLACE_TO_CUSTOM_TRIP',payload:place})
        },
        removePlace : (place) =>{
            dispatch({type:'REMOVE_PLACE_FROM_CUSTOM_TRIP',payload:place})
        },
        customTripPlan: (placeIds,email) =>{
            dispatch({type:'CUSTOM_TRIP_PLAN_BEFORE'});
            axios.post(`https://noderestapp.azurewebsites.net/customTripPlan`,{places:placeIds,email:email})
            .then(response=>{
                if(response.status === 200){
                    dispatch({type:'CUSTOM_TRIP_PLAN_RECEIVED',payload:response.data})
                }else{
                    dispatch({type:'CUSTOM_TRIP_PLAN_ERROR',payload:'Error when getting data'})
                }
            })
            .catch(err=>{
                dispatch({type:'CUSTOM_TRIP_PLAN_ERROR',payload:err.message})
            })
        }

        
    }
}

export default connect(getProps,dispatchProps) (CustomTrip)
