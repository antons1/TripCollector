import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Trip from './Trip';

const App = () => {

    return (
        <div>
            <Trip />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));