import { useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import "./interactor-input-styles.css";

export default function InteractorInputView() {

    const { messages } = useAppState();
    const setAppState = useSetAppState();
    const [newMsg, setNewMsg] = useState('');

    function send() {
        setAppState({ messages: [...messages, newMsg] });
        setNewMsg('');
    }

    return (
        <div id="interactor-box">
            <input
                id="interactor-text-input"
                value={newMsg}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                onChange={e => setNewMsg(e.target.value)}
            />
            <button onClick={send}>Send</button>
        </div>
    )
}