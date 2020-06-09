import React, {Component}from 'react';
import '../css/myTrips.css'

import {connect} from 'react-redux';
import axios from 'axios';
import PlanedTrip from './PlanedTrip'

class MyTrips extends Component{

    componentWillMount(){
        if(this.props.state.logged){
            this.props.getMyTrips(this.props.state.loggedEmail);
        }
        
     }

     getTrips = () =>{
        this.props.getMyTrips(this.props.state.loggedEmail);
     }

     viewTrip = (trip) =>{
         this.props.viewTrip(trip)
     }

    render(){


        var myTrips = <div></div>

        if(this.props.state.fetchedMyTrips && this.props.state.myTrips.trips.length > 0){
            myTrips = this.props.state.myTrips.trips.map((trip,i)=>( 
                (trip.trip.length > 0 && trip.distances.length > 0)?(
                    <div key={i} className="col s12 m7">
                <div className="card">
                    <div className="card-image img-sizing">
                    <img src={trip.trip[0].img} alt=""/>
                    <span className="card-title">{trip.topic}</span>
                    </div>
                    
                    <div className="card-action">
                    <button className="btn btn-small" onClick={()=>this.viewTrip(trip)}>View Trip</button>
                    </div>
                </div>
                </div>
                ):(<div  key={i}></div>)            
                
  
            ))
        }
        
        console.log(this.props.state)
        return(
            <div>

            {(this.props.state.loadingMyTrips)?(<div className="progress"><div className="indeterminate"></div></div>):(<div></div>)}
            {(!this.props.state.logged)?(<div className="not-logged">Please Log in to Get My Trips</div>):(<div></div>)}
            {(this.props.state.logged && ! this.props.state.fetchedMyTrips)?(<div className="center"><button className="btn btn-small bt-size" onClick={()=>this.getTrips()}>Get Trips</button></div>):(<div></div>)}

            {(this.props.state.fetchedMyTrips)?(<div className="grid-mt">{myTrips}</div>):(<div></div>)}
            {(this.props.state.myTrips?.trips.length === 0)?(<div><h3 className="no-trip">You did not plan any trip. Please make sure you are log in and plan your trip</h3></div>):(<div></div>)}
            {(this.props.state.viewMyPastTrip)?(<PlanedTrip/>):(<div></div>)}

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
        getMyTrips: (email)=>{
            dispatch({type:'GET_MY_TRIPS_BEFORE'})
            axios.get(`https://noderestapp.azurewebsites.net/myTrips/${email}`)
            .then(response=>{
                console.log(response)
                if(response.status ===  200){
                    dispatch({type:'GOT_MY_TRIPS',payload:response.data})
                }else{
                    dispatch({type:'GOT_MY_TRIPS_ERR',payload:'Error when fetching backend API'})
                } 
            })
            .catch(err=>{
                console.log(err.response, "rre")
                if(err.response.status === 400){
                    console.log(err.response.data.error.message)
                    dispatch({type:'GOT_MY_TRIPS_ERR',payload:err.response.data.error.message})
                }else{
                    dispatch({type:'GOT_MY_TRIPS_ERR',payload:err.message})
                }
            })
        },
        viewTrip: (trip) =>{
            dispatch({type:'VIEW_MY_TRIP',payload:trip})
        }
    }
}

export default connect(getProps,getPlaceDet)(MyTrips)