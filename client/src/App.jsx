import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { NewTrip } from './pages/NewTrip';
import { TripList } from './pages/TripList';
import { Trip } from './pages/Trip';
import { Index } from './pages/Index';
import { Header } from './components/layout/Header';

import './app.scss';
import { Footer } from './components/layout/Footer';

export const App = ({ }) => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/"><Index /></Route>
                <Route exact path="/trips"><TripList /></Route>
                <Route path="/new-trip"><NewTrip /></Route>
                <Route path="/trips/:tripId"><Trip /></Route>
            </Switch>
            <Footer />
        </Router>
    )
}