const { config } = require("../config/config");

function hostname() {
    const { backend: { host, port } } = config();

    if(!port) return `//${host}`;
    else return `//${host}:${port}`;
}

function identityHostname() {
    return `https://identity.lanodispenser.no`;
}

function returnUrl() {
    return encodeURIComponent(window.location.href);
}

function loginUrl() {
    return `${identityHostname()}/api/self-service/login/browser?return_to=${returnUrl()}`;
}

function registerUrl() {
    return `${identityHostname()}/api/self-service/registration/browser?return_to=${returnUrl()}`
}

function logoutUrl() {
    return `${identityHostname()}/api/self-service/browser/flows/logout?return_to=${returnUrl()}`
}

function session() {
    return fetch(`${identityHostname()}/api/sessions/whoami`, { credentials: 'include' })
    .then((res) => {
        console.log(res);
        if([200, 401, 403].includes(res.status)) return res.json().then((response) => ({ response, status: res.status }));
        else return { response: res, status: response.status }
    })
}

export default {
    hostname,
    session,
    loginUrl,
    registerUrl,
    logoutUrl
}