import { useState, useEffect } from 'react';

function readTokensFromLocalStorage(namespace) {
    return JSON.parse(localStorage.getItem(`${namespace}_tokens`));
}

function saveTokensToLocalStorage(namespace, tokens) {
    if(!tokens.expires_at) {
        tokens.expires_at = Math.floor(Date.now() / 1000) + tokens.expires_in;
    }
    localStorage.setItem(`${namespace}_tokens`, JSON.stringify(tokens));
}

function readQueryResponse(paramNames) {
    console.log(paramNames)
    const params = (new URL(document.location)).searchParams;
    return paramNames.reduce((acc, paramName) => Object.assign(acc, { [paramName]: params.get(paramName) }), {});
}

function beginCodeAuthorization(queries, url) {
    window.location = `${url}?${Object.keys(queries).reduce((res, curr) =>
        `${res}${res === "" ? "" : "&"}${curr}=${queries[curr]}`, "")}`;
}

async function continueCodeAuthorization(url, clientId, clientSecret, code) {
    console.log("Going by code", code);
    const data = new FormData();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("code", code);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", "http://localhost:1234");

    return fetch(url, {
        method: "POST",
        body: data
    }).then((response) => response.json()).catch((err) => {
        console.log("Error doing code auth", err);
        return null;
    })
}

async function doRefreshAuthorization(url, clientId, clientSecret, refreshToken) {
    const data = new FormData();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("refresh_token", refreshToken);
    data.append("grant_type", "refresh_token");
    data.append("redirect_uri", "http://localhost:1234");

    return fetch(url, {
        method: "POST",
        body: data
    }).then((response) => response.json()).catch((err) => {
        console.log("Error doing refresh auth", err);
        return null;
    });
}

function isTokenValidFn(token) {
    const now = Math.floor(Date.now() / 1000);
    return !!token && token.expires_at > now;
}

function tokenExistsFn(token) {
    console.log("Token exists?", !!token);
    return !!token;
}

export function useOauth(namespace, { clientId, clientSecret, loginUrl, authUrl, scopes, extraLoginQueries, ...oauthConfig }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isTokenValid, setTokenIsValid] = useState(false);
    const [tokenBecameInvalid, setTokenBecameInvalid] = useState(false);
    const [fetchingToken, setFetchingToken] = useState(false);

    useEffect(() => {
        async function tokenFn() {
            const token = readTokensFromLocalStorage(namespace);
            if (isTokenValidFn(token)) {
                setAccessToken(token.access_token);
                setTokenIsValid(true);
            }
            else if (tokenExistsFn(token)) {
                setFetchingToken(true);
                const newToken = await doRefreshAuthorization(authUrl, clientId, clientSecret, token.refresh_token)
                saveTokensToLocalStorage(namespace, newToken);
                setAccessToken(newToken.access_token);
                setTokenIsValid(true);
                setFetchingToken(false);
            } else if (readQueryResponse([ "code" ]).code) {
                setFetchingToken(true);
                const newToken = await continueCodeAuthorization(authUrl, clientId, clientSecret, readQueryResponse([ "code" ]).code)
                saveTokensToLocalStorage(namespace, newToken);
                setAccessToken(newToken.access_token);
                setTokenIsValid(true);
                setFetchingToken(false);
            } else {
                beginCodeAuthorization(Object.assign({
                    client_id: clientId,
                    redirect_uri: "http://localhost:1234",
                    response_type: "code",
                    scope: scopes,
                    state: "test" + namespace
                }, extraLoginQueries), loginUrl);
            }
            setTokenBecameInvalid(false);
        }
        tokenFn();
    }, [tokenBecameInvalid]);

    return { accessToken, isTokenValid, fetchingToken, setTokenBecameInvalid };
}