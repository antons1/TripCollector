import React from 'react';

import { getTrip } from './data/api';

export default function Trip() {
    const trip = getTrip("3b9c13bf-4568-48b7-8d95-90fade57fcc6");
    window.trip = trip;

    return (
        <div className="trip">
            <h3 className="trip__heading">{trip.name}</h3>
            <div>Av {trip.users.map((user, key) => <span key={key}>{user.name}</span>)}</div>
            <div>Fra {trip.from} til {trip.to}</div>
        </div>
    )
}