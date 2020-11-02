import React from 'react';
import ReactDOM from 'react-dom';

import { config } from './config/config';


const App = () => {
    const [msg, setMsg] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();

    const conf = config();

    React.useEffect(() => {
        setLoading(true);
        fetch(`//${conf.backend.host}:${conf.backend.port}/api/articles`).then((res) => res.json()).then((res) => {
            setMsg(res);
            setLoading(false);
        }).catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, [])

    const { title, author } = msg;

    return (
        <div>
            {loading && <pre>Laster...</pre>}
            {title && <h1>{title}</h1>}
            {author && <pre>By {author}</pre>}
            {error && <pre>{error}</pre>}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));