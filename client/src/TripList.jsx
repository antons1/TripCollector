import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config/config';

export function TripList({ }) {
    const [trips, setTrips] = React.useState([]);

    React.useEffect(() => {
        fetch(`//${config().backend.host}:${config().backend.port}/api/trips`).then((res) => res.json()).then(setTrips).catch((err) => console.log(err))
    }, [])

    return (
        <div>
            {trips.map(({ _id, title, author, from, to }) =>
                <div key={_id}>
                    <h2>{title}</h2>
                    <pre>Av {author} ({_id})</pre>
                    <pre>Fra {from} til {to}</pre>
                    <Link to={`/trips/${_id}`}>Les mer</Link>
                </div>)}
        </div>
    )
}