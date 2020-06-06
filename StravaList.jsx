import React, { useEffect, useState } from 'react';

import { useOauth } from './useOauth';

export const StravaList = () => {
    const [activities, setActivities] = useState([]);

    const { accessToken, isTokenValid, fetchingToken, setTokenBecameInvalid } = useOauth();

    const activityEffect = useEffect(() => {
        if (isTokenValid) {
            fetch("https://www.strava.com/api/v3/athlete/activities", {
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