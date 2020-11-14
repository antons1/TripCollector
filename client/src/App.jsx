import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { NewTrip } from './NewTrip';
import { TripList } from './TripList';
import { Trip } from './Trip';


export const App = ({ }) => {
    React.useEffect(() => {
        fetch(`//identity.lanodispenser.no/api/sessions/whoami`, { credentials: "include" })
        .then((res) => {
            if(res.ok) {
                console.log("Authenticated with identity");
                return res.json().then((res) => ({ payload: res, json: true }));
            } else return { payload: res, json: false }
        }).then(({payload, json}) => console.log(json ? JSON.stringify(payload, null, 2) : payload))
        .catch((err) => {
            if(err.status === 401 || err.status === 403) window.location = `//identity.lanodispenser.no/api/self-service/login/browser?return_to=${encodeURIComponent(window.location)}`
            console.log(err);
        })
    }, [])
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