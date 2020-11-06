import React from 'react';

import { config } from "../config/config";

const initialState = {
    title: "",
    author: "",
    from: null,
    to: null
}

function reducer(state, action) {
    switch (action.type) {
        default:
            return state;

        case "UPDATE_FORM":
            return { ...state, [action.name]: action.value }
    }
}

export const NewTrip = ({ }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [sending, setSending] = React.useState(false);
    const [sError, setSError] = React.useState(null);
    const [tripId, settripId] = React.useState(null);

    function updateFormFn(formField) {
        return (e) => dispatch({ type: "UPDATE_FORM", name: formField, value: e.target.value })
    }

    function submit(e) {
        e.preventDefault();
        const art = { ...state, from: `${state.from}T00:00:00.00Z`, to: `${state.to}T00:00:00.00Z` };
        setSError(null);
        setSending(true);
        settripId(null);

        fetch(`//${config().backend.host}:${config().backend.port}/api/trips/create`, {
            method: "POST",
            body: JSON.stringify(art, null, 2),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json()).then((res) => {
            console.log(res);
            setSending(false);
            settripId(res._id);
        }).catch((err) => {
            setSError(err);
            console.log(err);
            setSending(false);
        })
    }

    return (
        <>
            <form>
                {tripId && <div>Lagret artikkel med id {tripId}</div>}
                {sError && <div>Det oppstod en feil ved lagring: {sError.message}</div>}
                {sending && <div>Lagrer artikkel...</div>}
                <label>
                    Tittel<br />
                    <input type="text" onChange={updateFormFn("title")} /><br />
                </label>
                <label>
                    Forfatter<br />
                    <input type="text" onChange={updateFormFn("author")} /><br />
                </label>
                <label>
                    Fra<br />
                    <input type="date" onChange={updateFormFn("from")} /><br />
                </label>
                <label>
                    Til<br />
                    <input type="date" onChange={updateFormFn("to")} /><br />
                </label>
                <input type="submit" value="Lagre" onClick={submit} disabled={sending} />
            </form>
        </>);
}