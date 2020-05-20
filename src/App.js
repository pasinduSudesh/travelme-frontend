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
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Route exact path='/' component={Home}/>
          <Route  path='/planTrip' component={PlanTrip}/>          
          <Route  path='/hotels' component={Hotels}/>          
          <Route  path='/placeDetails/:id' component={SinglePlace}/>          
          <Route path='/places' component={Places}/>
          <Route path='/about' component={About}/>
          <Route path='/content' component={Content}/>
          <Footer/>
          </div>
        </BrowserRouter>
      );
    }
}

export default App;
