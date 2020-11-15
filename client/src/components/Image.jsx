import React from 'react';

import './image.scss';

export function Image({src, className}) {
    return (
        <img src={src} className={`tc-image ${className ? className : ""}`} />
    )
}