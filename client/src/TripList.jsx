import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export function TripList({ }) {
    const [trips, setTrips] = React.useState([]);

    React.useEffect(() => {
        fetch(`//${api.hostname()}/api/trips`).then((res) => {
            if(res.status === 200) res.json().then(setTrips);
            else res.json()
        }).then((res) => console.log(res)).catch((err) => console.log(err))
    }, [])

    return (
        <div>
            {trips && trips.map && trips.map(({ _id, title, author, from, to }) =>
                <div key={_id}>
                    <h2>{title}</h2>
                    <pre>Av {author} ({_id})</pre>
                    <pre>Fra {from} til {to}</pre>
                    <Link to={`/trips/${_id}`}>Les mer</Link>
                </div>)}
        </div>
    )
}