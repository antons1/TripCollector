import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { StravaList } from './StravaList';
import { GoogleList } from './GoogleList';

const App = () => {
    

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap"
        }}>
            <div>
                <StravaList />
            </div>
            <div>
                <GoogleList />
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));