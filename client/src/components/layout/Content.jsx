import React from 'react';

import './content.scss';

export function Content({children}) {

    return (
        <div className="tc-content">
            {children}
        </div>
    )
}