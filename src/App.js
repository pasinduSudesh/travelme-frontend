import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Content from './components/Content';
import Footer from './components/Footer';
import Places from './components/Places';
import PlanTrip from './components/tripPlan';
import Hotels from './components/Hotels';
import SinglePlace from './components/SinglePlace';
import Error404 from './components/404';
import CustomTrip from './components/CustomTripPlan';
import MyTrips from './components/MyTrips';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route  path='/planTrip' component={PlanTrip}/>          
          <Route  path='/hotels' component={Hotels}/>          
          <Route  path='/placeDetails/:id' component={SinglePlace}/>          
          <Route path='/places' component={Places}/>
          <Route path='/customTripPlan' component={CustomTrip}/>
          <Route path='/myTrips' component={MyTrips}/>
          <Route path='/about' component={About}/>
          <Route path='/content' component={Content}/>
          <Route  component={Error404}/>
          </Switch>
          <Footer/>
          </div>
        </BrowserRouter>
      );
    }
}

export default App;
