import React, {Component}from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { facebook, youtube } from '@fortawesome/free-solid-svg-icons'

import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import '../css/place.css'

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
        // console.log(this.state.placeName)
        this.setState({loading:true})
        var placeName = this.state.placeName;
        axios.post('https://noderestapp.azurewebsites.net/crawlNearestPlaces',{place:placeName})
        .then(response =>{
            this.setState({
                msg:true,
                loading:false,
                places:response.data.places
            })
            console.log(response.data.places);
            console.log(this.state)
        }).catch(function(err){
            console.log(err);
        });

        
    }
    // if(this.state.places == null)
    

    render(){

        var placeDetails = <div></div>

        if (! ( this.state.places === null)){

            placeDetails = this.state.places.map((place)=>(

            <div key={place.img} className="container">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={place.img} class="fadeIn" alt=""/>
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
            {((this.state.loading)?(<div class="progress"><div class="indeterminate"></div></div>):(<div></div>))}
            {(this.state.msg)?(
                    <div>{placeDetails}</div>
            ):(
                <div></div>
                 
            )}
            </div>
        )
    }
}

export default Places
