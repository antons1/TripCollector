import React, { useEffect, useState } from 'react';

import { useOauth } from './oauth/useOauth';

export const GoogleList = () => {
    const [imageData, setImageData] = useState([]);

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
        if (isTokenValid) {
            fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({
                    "pageSize": 99,
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
            {imageData.map(({ filename, baseUrl, mediaMetadata }, key) =>
                <div key={key}>
                    <h3>{filename}</h3>
                    <img src={baseUrl} style={{ "width": "100px" }} />
                    <ul>
                        <li>{mediaMetadata.created_time}</li>
                        <li>{mediaMetadata.photo.cameraMake} {mediaMetadata.photo.cameraModel} ({mediaMetadata.width}x{mediaMetadata.height})</li>
                    </ul>
                </div>
            )}
        </div>
    )
}