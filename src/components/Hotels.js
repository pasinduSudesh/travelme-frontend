import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import '../css/home.css';
import '../css/hotels.css';
import {connect} from 'react-redux';

class Hotels extends Component{

    state = {
        place:null
    }

    searchHotels = ()=>{

        this.props.searchHotels(this.state.place);

    }

    changeHandler = (e) => {

        this.setState({place:e.target.value});

    }

    render(){

        console.log(this.props);

        var facilities = facArray  =>{
            var facis = facArray.map((fac,i)=>(
                (i<12)?(<span key={i} className="new badge pad">{fac}</span>):(<div></div>)
            ))
            return facis
        } 

        

        var hotelDet = (<div></div>)

        if(this.props.state.fetchedSeachHotels){
            hotelDet = this.props.state.searchHotelResults.map((hotel)=>(
                <div key={hotel.img} className="container">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={hotel.img} className="fadeIn" alt=""/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content padding-content">
                            <div className="hotel-name">{hotel.name}</div>
                            <p className="hotel-address"><i class="material-icons">location_on</i>{hotel.address}</p>
                            <p className="hotel-rating">{hotel.rating} Rating</p>
                            {facilities(hotel.facilities)} </div>
                            <div class="card-action">
                                <a href={hotel.hotelUrl} target="_blank" rel="noopener noreferrer">BOOKING DETAILS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))
            
        }
        else{
            hotelDet = this.props.state.searchHotelResults.map((h,i)=>(
                
                <div key={i} className="col s12 m4">
                  <div className="card">
                    <div className="card-image imgs">
                      <img src={h.img} alt=""/>
                      <span className="card-title">{h.name}</span>
                      
                    </div>
                    <div className="card-content">
                      <p><i class="material-icons">location_on</i>{h.address}</p>
                    </div>
                  </div>
                </div>
              
            ))
        }
        
        return(<div>
            <section id="search" className="section section-search teal darken-1 white-text center scrollspy">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                {/* <h3>Search D    estinations</h3> */}
                                <div className="input-field">
                                    {/* <label></label> */}
                                    <input className="white grey-text autocomplete" placeholder="Polonnaruwa, Galle, Sigiriya..."  name="placeName" onChange={this.changeHandler} type="text" id="autocomplete-input"/>
                                {/* <a href="/" className="btn btn-large">search place</a> */}
                                <button onClick={this.searchHotels} className="btn-large">Search Hotels</button>
                                </div>
                            </div>
                        </div>
                    </div>                   
            </section>
            {(this.props.state.loadingSearchHotels)?(<div className="progress"><div className="indeterminate"></div></div>):(<div></div>)}
            {(this.props.state.fetchedSeachHotels)?(hotelDet):(<div className="row">{hotelDet}</div>)}
            
        </div>)
    }

}

const getProps = (state)=>{
    return{
        state
    }
}
const getPlaceDet = (dispatch) =>{
    return {
        searchHotels: (place) => {
            dispatch({type:'SEARCH_HOTEL_BEFORE'})
            axios.get(`https://noderestapp.azurewebsites.net/searchHotel/${place}`)
            .then( response=>{
                if(response.status ===  200){
                    dispatch({type:'SEARCH_HOTEL_RECEIVED',payload:response.data})
                }else{
                    dispatch({type:'SEARCH_HOTEL_ERROR',payload:'Error when fetching backend API'})
                }
            })
            .catch(err=>{
                dispatch({type:'SEARCH_HOTEL_ERROR',payload:err.message})
            })
        }
    }
}

export default connect(getProps,getPlaceDet) (Hotels)