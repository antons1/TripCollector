import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    const [msg, setMsg] = React.useState("");
    React.useEffect(() => {
        fetch('http://localhost:3000/').then((res) => res.text()).then((res) => setMsg(res)).catch((err) => setMsg(err));
    }, [])

    return (
        <div>
            <h1>Hello</h1>
            <pre>{msg}</pre>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));