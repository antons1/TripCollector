import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import { useAuthentication } from '../hooks/useAuthentication';

export function Menu({ }) {
    const { authenticated } = useAuthentication();

    return (
        <nav>
            <ul>
                {!authenticated && <>
                    <li><a href={api.loginUrl()}>Logg inn</a></li>
                    <li><a href={api.registerUrl()}>Ny bruker</a></li>
                </>}
                {authenticated && <>
                    <li><Link to="/new-trip">Ny tur</Link></li>
                    <li><Link to="/trips">Turliste</Link></li>
                    <li><a href={api.logoutUrl()}>Logg ut</a></li>
                </>}
            </ul>
        </nav>
    )
}