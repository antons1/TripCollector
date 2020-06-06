import { useEffect, useState } from 'react';

function readTokensFromLocalStorage() {
    console.log("Getting from storage", JSON.parse(localStorage.getItem("stravatoken")));
    return JSON.parse(localStorage.getItem("stravatoken"));
}

function saveTokensToLocalStorage(token) {
    console.log("Saving to storage", token);
    localStorage.setItem("stravatoken", JSON.stringify(token));
}

function readQueryResponse() {
    const params = (new URL(document.location)).searchParams;
    const code = params.get("code");
    const scope = params.get("scope");
    const state = params.get("state");

    console.log("got code", code, "scope", scope, "state", state);

    if (code) {
        return {
            code,
            scope,
            state
        }
    } else return null
}

function doCodeAuthorization() {
    const queries = {
        client_id: 49296,
        redirect_uri: "http://localhost:1234",
        response_type: "code",
        scope: "read,activity:read",
        state: "test"
    }
    console.log("Beginning code auth", `https://www.strava.com/oauth/authorize?${Object.keys(queries).reduce((res, curr) => `${res}${res === "" ? "" : "&"}${curr}=${queries[curr]}`, "")}`)

    window.location = `https://www.strava.com/oauth/authorize?${Object.keys(queries).reduce((res, curr) => `${res}${res === "" ? "" : "&"}${curr}=${queries[curr]}`, "")}`;
}

function continueCodeAuthorization(code) {
    const data = new FormData();
    data.append("client_id", 49296);
    data.append("client_secret", "77c608a4ebca1bdf9abc556970d98d333d8ae7fa");
    data.append("code", code);
    data.append("grant_type", "authorization_code");

    console.log("Continuing code auth", code);
    return fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        body: data
    }).then((response) => response.json())
}

function doRefreshAuthorization(refresh_token) {
    const data = new FormData();
    data.append("client_id", 49296);
    data.append("client_secret", "77c608a4ebca1bdf9abc556970d98d333d8ae7fa");
    data.append("refresh_token", refresh_token);
    data.append("grant_type", "refresh_token");

    console.log("Refreshing token", refresh_token);
    return fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        body: data
    }).then((response) => response.json());
}

function isTokenValidFn(token) {
    const now = Math.floor(Date.now() / 1000);
    console.log("Token is valid?", !!token && token.expires_at > now);
    return !!token && token.expires_at > now;
}

function tokenExistsFn(token) {
    console.log("Token exists?", !!token);
    return !!token;
}

export function useOauth() {
    const [accessToken, setAccessToken] = useState(null);
    const [isTokenValid, setTokenIsValid] = useState(false);
    const [tokenBecameInvalid, setTokenBecameInvalid] = useState(false);
    const [fetchingToken, setFetchingToken] = useState(false);

    useEffect(() => {
        const token = readTokensFromLocalStorage();
        if(isTokenValidFn(token)) {
            setAccessToken(token.access_token);
            setTokenIsValid(true);
        }
        else if(tokenExistsFn(token)) {
            setFetchingToken(true);
            doRefreshAuthorization(token.refresh_token).then((token) => {
                saveTokensToLocalStorage(token);
                setAccessToken(token.access_token);
                setTokenIsValid(true);
                setFetchingToken(false);
            });
        } else if(readQueryResponse()) {
            setFetchingToken(true);
            continueCodeAuthorization(readQueryResponse().code).then((token) => {
                saveTokensToLocalStorage(token);
                setAccessToken(token.access_token);
                setTokenIsValid(true);
                setFetchingToken(false);
            });
        } else doCodeAuthorization();
        setTokenBecameInvalid(false);
    }, [tokenBecameInvalid]);

    return { accessToken, isTokenValid, fetchingToken, setTokenBecameInvalid }
}