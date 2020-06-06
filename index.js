import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { StravaList } from './StravaList';

/* import { OAuth2 } from 'googleapis/build/src/';
const oauth2client = google.auth.OAuth2(
    "844651364279-36lfnltgjv2sm78a2u03tjl4qu3bkb0g.apps.googleusercontent.com",
    "u8djNUzFSVnxkuALLQB6-O1_",
    "http://localhost:1234"
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: "https://www.googleapis.com/auth/photoslibrary.readonly"
}); */



const App = () => {

    return (
        <div>
            <div>Hello world!</div>
            {
                //<StravaList />
            }
            <pre></pre>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));