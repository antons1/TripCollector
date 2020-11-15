import {useEffect, useState} from 'react';
import api from '../../api/api';

export function useAuthentication(redirectOnUnauthenticated = false) {
    const [authenticated, setAuthenticated] = useState(false);
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.session().then(({response, status}) => {
            setLoading(false);
            setResponse(response);
            if(status === 200) {
                setAuthenticated(true);
            } else if ([401, 403].includes(status)) {
                setAuthenticated(false);
                if(redirectOnUnauthenticated) window.location = api.loginUrl();
            }
        }).catch((error) => {
            setAuthenticated(false);
            setLoading(false);
            setResponse(response);
            setError(error);
        })
    }, [])

    return { authenticated, response, loading, error }
}