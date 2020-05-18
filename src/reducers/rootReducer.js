import { createStore } from 'redux';

const initState = {
    loading:false,
    fetchedPlace:false,
    errMsgPlace:false,
    errMsgHotel:null,
    fetchedTripPlaceData:false,
    loadingHotel:false,
    hotelsInTrip:[]
}

const rootReducer = (state=initState, action) =>{
    // console.log(action);
    switch (action.type){
        case "SEARCH_PLACE_BEFORE":{
            return {...state,loading:true}                       
        }
        case "SEARCH_PLACE_RECEIVED":{
            return {...state,loading:false,fetchedPlace:true,searchedPlaces:action.payload}            
        }
        case "SEARCH_PLACES_ERROR":{
            return {...state,loading:false,fetchedPlace:false,errMsgPlace:action.payload}            
        }
        case "PLAN_TRIP_BEFORE":{
            return {...state,loading:true}            
        }
        case "PLAN_TRIP_GOT":{
            return {...state,loading:false,fetchedTripPlaceData:true,tripPlaces:action.payload.trip,tripDistances:action.payload.distances,tripNumberOfDays:action.numOfDays,tripCenterPoint:action.placeName}            
        }
        case "PLAN_TRIP_ERROR":{
            return {...state,loading:false,fetchedPlace:false,errMsgPlace:action.payload}            
        }
        case "FIND_NEAREST_HOTEL_BEFORE":{
            return {...state,loadingHotel:true}            
        }
        case "FIND_NEAREST_HOTEL_GOT":{
            state.hotelsInTrip.push({id:action.placeId,data:action.payload})
            return {...state,loadingHotel:false}            
        }
        case "FIND_NEAREST_HOTEl_ERROR":{
            return {...state,loadingHotel:true,errMsgHotel:action.payload}            
        }
        default:{
            return {...state}
        }
    } 
    
}


const store =  createStore(rootReducer);

export default store;