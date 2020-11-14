import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export function Trip({}) {
    const { tripId } = useParams()
    const [{ title, author, from, to, _id }, setTrip] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if(!tripId) return;
        setError(null);
        setLoading(true);
        setTrip({});

        fetch(`//${api.hostname()}/api/trips/${tripId}`)
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                setTrip(res);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
                setLoading(false);
            })
    }, [tripId])

    return (
        <div>
            {error && error.code === 404 && <div>Turen finnes ikke</div>}
            {error && error.code !== 404 && <div>Noe gikk galt: {error.message}</div>}
            {loading && <div>Laster tur...</div>}
            <div>
                <h2>{title}</h2>
                <pre>Av {author} ({_id})</pre>
                <pre>Fra {from} til {to}</pre>
            </div>
        </div>
    )
}