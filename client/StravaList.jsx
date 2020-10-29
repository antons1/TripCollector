import React, { useEffect, useState } from 'react';

import { useOauth } from './oauth/useOauth';

export const StravaList = () => {
    const [activities, setActivities] = useState([]);

    const { accessToken, isTokenValid, fetchingToken, setTokenBecameInvalid } = useOauth("Strava", {
        clientId: 49296,
        clientSecret: "77c608a4ebca1bdf9abc556970d98d333d8ae7fa",
        loginUrl: "https://www.strava.com/oauth/authorize",
        authUrl: "https://www.strava.com/oauth/token",
        scopes: "read,activity:read"
    });

    const activityEffect = useEffect(() => {
        if (isTokenValid) {
            fetch("https://www.strava.com/api/v3/athlete/activities?before=1563148740&after=1562544000", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }).then((res) => res.json()).then(setActivities).catch((e) => setTokenBecameInvalid(true));
        }
    }, [isTokenValid]);

    return (
        <div>
            {activities.map(({ name, distance, elapsed_time, total_elevation_gain, start_date, ...activity }, key) =>
                <div key={key}>
                    <h3>{name}</h3>
                    <ul>
                        <li>Distanse: {distance} m</li>
                        <li>Tid brukt: {elapsed_time} s</li>
                        <li>Stigning: {total_elevation_gain} m</li>
                        <li>Start-dato: {start_date}</li>
                    </ul>
                </div>)}
        </div>
    )
}