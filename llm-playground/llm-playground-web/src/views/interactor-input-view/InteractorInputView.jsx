import { useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";


export default function InteractorInputView() {

    const { counter, messages } = useAppState();
    const setAppState = useSetAppState();
    const [newMsg, setNewMsg] = useState('');

    return (<div>
        <h4>Interactor Input</h4>
        <span>counter:</span> {counter}
        <br />
        <span>messages:</span> {JSON.stringify(messages, null, 4)}
        <br />
        <input value={newMsg} onChange={e => setNewMsg(e.target.value)} />
        <button onClick={() => setAppState({ messages: [...messages, newMsg] })}>send message</button>
        <button onClick={() => setAppState({ messages: [] })}>clear all msgs</button>
        <button onClick={() => setAppState({ counter: counter + 1 })}> increment counter</button>
    </div>)
}