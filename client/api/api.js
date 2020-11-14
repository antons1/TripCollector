const { config } = require("../config/config");

function hostname() {
    const { backend: { host, port } } = config();

    if(!port) return `//${host}`;
    else return `//${host}:${port}`;
}

export default {
    hostname
}