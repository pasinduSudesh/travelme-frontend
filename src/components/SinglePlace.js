import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'
// import { compose, withProps } from 'recompose'
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import {connect} from 'react-redux';
import '../css/singlePlace.css'
// import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"




class SingalPlace extends Component{
   componentWillMount(){
        this.props.getData(this.props.match.params.id);
     }

     componentDidUpdate(){
        // this.props.getData(this.props.match.params.id);
     }

     refreshPage(){
        
     }

     getData = (id) =>{
        this.props.getData(id);
     }

    
    
    render(){
        console.log(this.props);

        

        
       
        return(
            <div>
            <div className="padd">
            {(this.props.state.fetchedSinglePlaceDet)?(<div className="center">

            <h4 className="head-title">{this.props.state.singlePlaceDet.placeName}</h4> 
            <div className="place-img">
                <img src={this.props.state.singlePlaceDet.img} alt=""/>
            </div>
            <p>Latitude: {this.props.state.singlePlaceDet.lat} & Longitude: {this.props.state.singlePlaceDet.lng}</p>
            <h5 className="rating">Rating :  {this.props.state.singlePlaceDet.rating}</h5>
            <h4 className="review-head">Reviews</h4>
            <div className="marg">
                <p className="review"> {this.props.state.singlePlaceDet.reviews[0]}</p>
            </div>
            <div className="row">
            {(this.props.state.singlePlaceDet.nearestPlaces.length > 0)?(
                <div className="col s12 m4">
                    <div className="card">
                        <div className="card-image crad-i">
                            <img src={this.props.state.singlePlaceDet.nearestPlaces[0].img} alt=""/>
                        </div>
                        <div className="card-content card-c">
                            <p>{this.props.state.singlePlaceDet.nearestPlaces[0].placeName}
                            </p>
                            <button className="btn btn-small" onClick={()=>this.getData(this.props.state.singlePlaceDet.nearestPlaces[0].placeId)}>MORE</button>

                        </div>
                    </div>
                </div>

            ):(<div></div>)}
            
            {(this.props.state.singlePlaceDet.nearestPlaces.length > 1)?(
                
                
                <div className="col s12 m4">
                    <div className="card">
                        <div className="card-image crad-i">
                            <img src={this.props.state.singlePlaceDet.nearestPlaces[1].img} alt=""/>
                        </div>
                        <div className="card-content card-c">
                            <p>{this.props.state.singlePlaceDet.nearestPlaces[1].placeName}
                            </p>
                            <button className="btn btn-small" onClick={()=>this.getData(this.props.state.singlePlaceDet.nearestPlaces[1].placeId)}>MORE</button>

                        </div>
                    </div>
                </div>

                ):(<div></div>)}

                {(this.props.state.singlePlaceDet.nearestPlaces.length > 2)?(
                <div className="col s12 m4">
                    <div className="card">
                        <div className="card-image crad-i">
                            <img src={this.props.state.singlePlaceDet.nearestPlaces[2].img} alt=""/>
                            <span className="card-title"></span>
                        </div>
                        <div className="card-content card-c">
                            <p>{this.props.state.singlePlaceDet.nearestPlaces[2].placeName}
                            </p>
                            {/* <Link to={`/placeDetails/${this.props.state.singlePlaceDet.nearestPlaces[2].placeId}`}><button className="btn btn-small" onClick={this.refreshPage}>MORE</button></Link> */}
                            <button className="btn btn-small" onClick={()=>this.getData(this.props.state.singlePlaceDet.nearestPlaces[2].placeId)}>MORE</button>
                        </div>
                    </div>
                </div>
            ):(<div></div>)}
            </div>
           


                
            </div>):(
                <div>
                    {(this.props.state.loadingSingalPlaceDet)?( <div className="progress"><div className="indeterminate"></div></div>):(<div></div>)}
                </div>
            )}
            </div>
            
           

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
        getData: (placeId) => {
            dispatch({type:'SINGLE_PLACE_DETAILS_BEFORE'})
            axios.get(`https://noderestapp.azurewebsites.net/placeReviews/${placeId}`)            
            .then(response=>{
                if(response.status === 200){
                    dispatch({type:'SINGLE_PLACE_DETAILS_GOT',payload:response.data})
                }else{
                    dispatch({type:'SINGLE_PLACE_DETAILS_ERROR',payload:'Error when fetching backend API'})
                }
            })
            .catch(err=>{
                dispatch({type:'SINGLE_PLACE_DETAILS_ERROR',payload:err.message})
            })
        },
        addPlaceToArray : (place) =>{
            dispatch({type:'APPEND_PLACE_TO_CUSTOM_TRIP',payload:place})
        }
    }
}

export default connect(getProps,getPlaceDet) (SingalPlace)

