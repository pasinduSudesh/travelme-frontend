import React, {Component}from 'react';
import '../css/navbar.css'

import {connect} from 'react-redux';
import axios from 'axios';

class MyTrips extends Component{

    componentWillMount(){
        if(this.props.state.logged){
            this.props.getMyTrips();
        }
        
     }

    render(){
        console.log(this.props.state)
        return(
            <div>

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
        getMyTrips: ()=>{
            dispatch({type:'GET_MY_TRIPS_BEFORE'})
            axios.get('https://noderestapp.azurewebsites.net/myTrips')
            .then(response=>{
                console.log(response);
                if(response.status ===  200){
                    dispatch({type:'GOT_MY_TRIPS',payload:response.data})
                }else{
                    dispatch({type:'GOT_MY_TRIPS_ERR',payload:'Error when fetching backend API'})
                } 
            })
            .catch(err=>{
                console.log(err)
                dispatch({type:'GOT_MY_TRIPS_ERR',payload:err.message})
            })
        }
    }
}

export default connect(getProps,getPlaceDet)(MyTrips)