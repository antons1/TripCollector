import React from 'react';
import { Menu } from './Menu';

import './header.scss';
import mapIcon from './map.svg';
import { Heading } from '../Heading';

export function Header({}) {
    console.log(mapIcon);
    return (
        <header className="tc-header">
            <img src={mapIcon} className="tc-header__logo" />
            <Heading level={1} className="tc-header__heading">
                TripCollector
            </Heading>
            <Menu />
        </header>
    )
}