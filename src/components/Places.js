import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import '../css/place.css';
import {connect} from 'react-redux';

class Places extends Component{

    state = {
        placeName:" ",
        msg:false,
        loading:false,
        places:null

    }

    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value});
    
    }

    searchPlaces = e =>{
       
        this.props.getData(this.state.placeName);
       

        
    }
    // if(this.state.places == null)
    

    render(){
        
        
        console.log(this.props);


        var placeDetails = <div></div>

        if ( ( this.props.state.fetchedPlace)){

            placeDetails = this.props.state.searchedPlaces.map((place)=>(

            <div key={place.img} className="container">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={place.img} className="fadeIn" alt=""/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                            <h4>{place.place_name}</h4>
                                <p>{place.place_title}</p>
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

        return(
            <div>
                <section id="search" className="section section-search teal darken-1 white-text center scrollspy">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                {/* <h3>Search D    estinations</h3> */}
                                <div className="input-field">
                                    {/* <label></label> */}
                                    <input className="white grey-text autocomplete" placeholder="Polonnaruwa, Galle, Sigiriya..." value={this.state.placeName} name="placeName" onChange={this.changeHandler} type="text" id="autocomplete-input"/>
                                {/* <a href="/" className="btn btn-large">search place</a> */}
                                <button onClick={this.searchPlaces} className="btn-large">Search place</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   
            </section>
            
            {((this.props.state.loading)?(<div className="progress"><div className="indeterminate"></div></div>):(<div></div>))}
            {(this.props.state.fetchedPlace)?(
                    <div>{placeDetails}</div>
            ):(
                <div></div>
                 
            )}
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
        getData: (place) => {
            dispatch({type:'SEARCH_PLACE_BEFORE'})
            axios.get(`https://noderestapp.azurewebsites.net/crawlNearestPlaces/${place}`)
            .then( response=>{
                if(response.status ===  200){
                    dispatch({type:'SEARCH_PLACE_RECEIVED',payload:response.data.places})
                }else{
                    dispatch({type:'SEARCH_PLACES_ERROR',payload:'Error when fetching backend API'})
                }
            })
            .catch(err=>{
                dispatch({type:'SEARCH_PLACES_ERROR',payload:err.message})
            })
        }
    }
}

export default connect(getProps,getPlaceDet) (Places)
