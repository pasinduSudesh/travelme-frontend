import { createStore } from 'redux';

const initState = {
    loading:false,
    fetchedPlace:false,
    errMsgPlace:false,
    errMsgHotel:null,
    fetchedTripPlaceData:false,
    loadingHotel:false,
    loadingSearchHotels:false,
    fetchedSeachHotels:false,
    loadingSingalPlaceDet:false,
    fetchedSinglePlaceDet:false,
    loadingCustomTripPlace:false,
    fetchedCustomTripPlace:false,
    customTripPlaceErr:false,
    hotelsInTrip:[],
    customTripPlan:false,
    logged:false,
    loadingMyTrips:false,
    fetchedMyTrips:false,
    customTripPlaceArrray:[],
    fetchedCustomTripPlan:false,
    searchHotelResults: [{
        "facilities": [
            "Free parking","Free High Speed Internet (WiFi)","Pool","Free breakfast","Children Activities (Kid / Family Friendly)","Pets Allowed ( Dog / Pet Friendly )",
            "Airport transportation","Business Center with Internet Access","Wifi","Outdoor pool","Restaurant","Breakfast available","Spa","Non-smoking hotel",
        ],
      
        "name": "Wirdana Resort & Spa",
        "address": "Gingahawila Waththa, Kadurupe, Boossa Wirdana Spa & Villas, Galle 80000 Sri Lanka",
        "hotelUrl": "https://www.tripadvisor.com/Hotel_Review-g297896-d12849921-Reviews-Wirdana_Resort_Spa-Galle_Galle_District_Southern_Province.html",
        "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/ec/e4/1a/wirdana-spa-villas.jpg?w=900&h=-1&s=1",
        "rating": 5   
    },
    {
        "facilities": [
            "Bar / lounge",
            "Children Activities (Kid / Family Friendly)",
            "Laundry service"
        ],
        "name": "Megabe Villa",
        "address": "No:230/11A, Colombo Road Mahamodara, Galle 80000 Sri Lanka",
        "hotelUrl": "https://www.tripadvisor.com/Hotel_Review-g297896-d13974630-Reviews-Megabe_Villa-Galle_Galle_District_Southern_Province.html",
        "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/aa/87/cf/img-20181209-082141599.jpg?w=900&h=-1&s=1",
        "rating": 4.5,
    },
   
    {
        "facilities": [
            "Free private parking nearby","Free High Speed Internet (WiFi)","Free breakfast","Beach","Bicycle rental","Kids stay free","Books, DVDs, music for children","Airport transportation",
            "Street parking","Wifi","Restaurant","Breakfast available","Complimentary instant cofffee","Bicycle tours","Walking tours"
        ],
        "name": "Mango House",
        "address": "3 Leyn Baan Cross Street, Galle 80000 Sri Lanka",
        "hotelUrl": "https://www.tripadvisor.com/Hotel_Review-g297896-d2034349-Reviews-Mango_House-Galle_Galle_District_Southern_Province.html",
        "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/23/43/8b/mango-house.jpg?w=900&h=-1&s=1",
        "rating": 4.5
    }]
    ,
    bestPlaces:[
        
        {
            "description": "Well done to all the team there and keep up the good work guys !!! Cheers !!",
            "img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/d8/49/a8/sea-turtle-hatchery-centre.jpg",
            "place": "Mahamodara Sea Turtle Hatchery Centre, Galle",
            "rating": 39.829443098788346
        },
        {
            "description": "Short trip from hotel by tuk tuk. Great views out to sea from the fortress walls with a cooling breeze. Excellent photo opportunity.",
            "img": "https://media-cdn.tripadvisor.com/media/photo-s/10/fc/c7/b0/attractions-in-galle.jpg",
            "place": "Galle Dutch Fort",
            "rating": 33.717748397436
        },
        {
            "description": "The lighthouse is a pleasant to look at building whilst walking along the line of the fortifications.",
            "img": "https://media-cdn.tripadvisor.com/media/photo-s/11/22/ac/d5/galle-lighthouse.jpg",
            "place": "Galle Fort - Lighthouse",
            "rating": 35.8125
        }
    ]
}

const rootReducer = (state=initState, action) =>{
    console.log(action);
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
            return {...state,loading:false,fetchedTripPlaceData:true,tripPlaces:action.payload.trip,tripDistances:action.payload.distances,tripNumberOfDays:action.numOfDays,tripCenterPoint:action.placeName,errMsgPlace:false}            
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
        case "GET_BEST_PLACES_RECEIVED":{
            return {...state,bestPlaces:action.payload}            
        }
        case "SEARCH_HOTEL_BEFORE":{
            return {...state,loadingSearchHotels:true}            
        }
        case "SEARCH_HOTEL_RECEIVED":{
            return {...state,loadingSearchHotels:false,fetchedSeachHotels:true,searchHotelResults:action.payload}            
        }
        case "SEARCH_HOTEL_ERROR":{
            return {...state,loadingSearchHotels:false,fetchedSeachHotels:false,searchHotelErrMsg:action.payload}            
        }
        case "SINGLE_PLACE_DETAILS_BEFORE":{
            return {...state,loadingSingalPlaceDet:true,fetchedSinglePlaceDet:false}            
        }
        case "SINGLE_PLACE_DETAILS_GOT":{
            return {...state,loadingSingalPlaceDet:false,fetchedSinglePlaceDet:true,singlePlaceDet:action.payload}            
        }
        case "SINGLE_PLACE_DETAILS_ERROR":{
            return {...state,loadingSingalPlaceDet:false,fetchedSinglePlaceDet:false,singlePlaceDetErr:action.payload}            
        }
        case "GET_PLACE_FOR_CUSTOM_TRIP_BEFORE":{
            return {...state,loadingCustomTripPlace:true,fetchedCustomTripPlace:false,customTripPlaceErr:false}            
        }
        case "GET_PLACE_FOR_CUSTOM_TRIP_RECEIVED":{
            return {...state,loadingCustomTripPlace:false,fetchedCustomTripPlace:true,customTripPlaceErr:false,customTripSearchPlaces:action.payload}            
        }
        case "GET_PLACE_FOR_CUSTOM_TRIP_ERROR":{
            return {...state,loadingCustomTripPlace:false,fetchedCustomTripPlace:false,customTripPlaceErr:action.payload}            
        }
        case "APPEND_PLACE_TO_CUSTOM_TRIP":{
            state.customTripPlaceArrray.push(action.payload)
            return {...state}           
        }
        case "REMOVE_PLACE_FROM_CUSTOM_TRIP":{
            var ss = state.customTripPlaceArrray.filter(a=>{
                return (a.placeId !== action.payload.placeId)
            })
            return {...state,customTripPlaceArrray:ss}           
        }
        case "CUSTOM_TRIP_PLAN_BEFORE":{
            return {...state,loadingCustomTripPlace:true,loading:true}           
        }
        case "CUSTOM_TRIP_PLAN_RECEIVED":{
            return {...state,loadingCustomTripPlace:false,loading:false,customTripPlan:true,fetchedTripPlaceData:true,tripPlaces:action.payload.trip,tripDistances:action.payload.distances,errMsgPlace:false,tripNumberOfDays:"1",tripCenterPoint:"custom"}           
        }
        case "CUSTOM_TRIP_PLAN_ERROR":{
            return {...state,loadingCustomTripPlace:false}           
        }
        case "RESET_TRIP":{
            return {...state,customTripPlan:false,customTripPlaceArrray:[]}           
        }
        case "LOGGED_IN_USER":{
            return {...state,logged:true,loggedEmail:action.payload}           
        }
        case "LOG_IN_ERROR":{
            return {...state,logged:false,loggedErrorMsg:action.payload}           
        }
        case "GET_MY_TRIPS_BEFORE":{
            return {...state,loadingMyTrips:true,fetchedMyTrips:false}           
        }
        case "GOT_MY_TRIPS":{
            return {...state,logged:false,loadingMyTrips:false,fetchedMyTrips:true,myTrips:action.payload}           
        }
        case "GOT_MY_TRIPS_ERR":{
            return {...state,logged:false,loadingMyTrips:false,fetchedMyTrips:false}           
        }
        default:{
            return {...state}
        }
    } 
    
}


const store =  createStore(rootReducer);

export default store;