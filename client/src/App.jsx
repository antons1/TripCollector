import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { NewTrip } from './pages/NewTrip';
import { TripList } from './TripList';
import { Trip } from './Trip';
import { Index } from './pages/Index';
import { Menu } from './components/Menu';

import './app.scss';

export const App = ({ }) => {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact path="/"><Index /></Route>
                <Route exact path="/trips"><TripList /></Route>
                <Route path="/new-trip"><NewTrip /></Route>
                <Route path="/trips/:tripId"><Trip /></Route>
            </Switch>
        </Router>
    )
}