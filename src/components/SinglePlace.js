import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'
// import { compose, withProps } from 'recompose'
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import {connect} from 'react-redux';
// import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
 



class SingalPlace extends Component{
   componentWillMount(){
        this.props.getData(this.props.match.params.id);
     }
    
    render(){

        
       
        return(
            <div>
            {(this.props.state.fetchedSinglePlaceDet)?(<div className="center">

            <h4>{this.props.state.singlePlaceDet.placeName}</h4>
            

               
                
            </div>):(
                <div>
                    {(this.props.state.loadingSingalPlaceDet)?(<div>Loading</div>):(<div></div>)}
                </div>
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
        }
    }
}

export default connect(getProps,getPlaceDet) (SingalPlace)

