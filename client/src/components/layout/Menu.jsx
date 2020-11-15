import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import { useAuthentication } from '../../hooks/useAuthentication';

import './menu.scss';

export function MenuItem({ hide, children }) {

    return (
        !hide && <li className="tc-menu-list__item">{children}</li>
    )
}

export function Menu({ }) {
    const { authenticated } = useAuthentication();

    return (
        <nav className="tc-menu">
            <ul className="tc-menu-list">
                <MenuItem hide={authenticated}><a href={api.loginUrl()}>Logg inn</a></MenuItem>
                <MenuItem hide={authenticated}><a href={api.registerUrl()}>Ny bruker</a></MenuItem>
                <MenuItem hide={!authenticated}><Link to="/new-trip">Ny tur</Link></MenuItem>
                <MenuItem hide={!authenticated}><Link to="/trips">Turliste</Link></MenuItem>
                <MenuItem hide={!authenticated}><a href={api.logoutUrl()}>Logg ut</a></MenuItem>
            </ul>
        </nav>
    )
}