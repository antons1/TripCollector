import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { NewTrip } from './NewTrip';
import { TripList } from './TripList';
import { Trip } from './Trip';


export const App = ({ }) => {
   return (
       <Router>
           <nav>
               <ul>
                   <li><Link to="/new-trip">Ny tur</Link></li>
                   <li><Link to="/trips">Turliste</Link></li>
               </ul>
           </nav>
           <Switch>
               <Route exact path="/"><TripList /></Route>
               <Route exact path="/trips"><TripList /></Route>
               <Route path="/new-trip"><NewTrip /></Route>
               <Route path="/trips/:tripId"><Trip /></Route>
           </Switch>
       </Router>
   )
}