import React from 'react';

import './heading.scss';

export function Heading({ level, className, children }) {
    let Tag = `h${level ? level : 1}`;

    return (
        <Tag className={`tc-heading tc-heading__${level ? level : 1} ${className ? className : ""}`}>{children}</Tag>
    )
}