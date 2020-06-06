import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { StravaList } from './StravaList';
import { useOauth } from './oauth/useOauth';

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
    const [activities, setActivities] = useState([]);
    const [imageData, setImageData] = useState([]);

    const { accessToken: stravaAccessToken, isTokenValid: stravaValid, fetchingToken: stravaFetchingToken, setTokenBecameInvalid: stravaSetTokenBecameInvalid } = useOauth("Strava", {
        clientId: 49296,
        clientSecret: "77c608a4ebca1bdf9abc556970d98d333d8ae7fa",
        loginUrl: "https://www.strava.com/oauth/authorize",
        authUrl: "https://www.strava.com/oauth/token",
        scopes: "read,activity:read"
    });

    const activityEffect = useEffect(() => {
        if (stravaValid) {
            fetch("https://www.strava.com/api/v3/athlete/activities?after=1562544000&before=1563148740", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + stravaAccessToken
                }
            }).then((res) => res.json()).then(setActivities).catch((e) => setTokenBecameInvalid(true));
        }
    }, [stravaValid]);

    const { accessToken, isTokenValid, fetchingToken, setTokenBecameInvalid } = useOauth("Google", {
        clientId: "844651364279-36lfnltgjv2sm78a2u03tjl4qu3bkb0g.apps.googleusercontent.com",
        clientSecret: "u8djNUzFSVnxkuALLQB6-O1_",
        scopes: "https://www.googleapis.com/auth/photoslibrary.readonly",
        authUrl: "https://oauth2.googleapis.com/token",
        loginUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        extraLoginQueries: {
            access_type: "offline"
        }
    })

    useEffect(() => {
        if(isTokenValid) {
            fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({
                    "pageSize": 100,
                    "filters": {
                      "dateFilter": {
                        "ranges": [
                          {
                            "startDate": {
                              "year": 2019,
                              "month": 7,
                              "day": 8
                            },
                            "endDate": {
                              "year": 2019,
                              "month": 7,
                              "day": 14
                            }
                          }
                        ]
                      }
                    }
                  })
            }).then((res) => res.json()).then(({ mediaItems }) => setImageData(mediaItems));
        }
    }, [accessToken])

    return (
        <div>
            <div>Hello world!</div>
            {
                //<StravaList />
            }
            <pre>{JSON.stringify(activities, null, 4)}</pre>
            <div>
                {imageData.map(({filename, baseUrl, mediaMetadata}, key) => 
                    <div key={key}>
                        <h3>{filename}</h3>
                        <img src={baseUrl} style={{ "width": "100px"}} />
                        <ul>
                            <li>{mediaMetadata.creation_time}</li>
                            <li>{mediaMetadata.photo.cameraMake} {mediaMetadata.photo.cameraModel} ({mediaMetadata.width}x{mediaMetadata.height})</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));