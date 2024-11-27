import { useEffect, useRef, useState } from "react";
import "./player-input-styles.css";
import Timer from "../../utils/timer";

export default function PlayerInput({ apiStatus, onSend, onInactivity }) {

    const [text, setText] = useState('');
    const timer = useRef(new Timer(5000)); // Trigger inactivity timeout after X milliseconds

    useEffect(() => {
        // Update the inactivity timer callback:
        timer.current.callBack = onInactivity;
    }, [onInactivity])

    useEffect(() => {
        if (apiStatus === 'idle') {
            timer.current?.start();
        } else {
            timer.current?.cancel();
        }
    }, [apiStatus])

    function send() {
        onSend(text);
        setText('');
    }

    function handleInput(event) {
        const value = event.target.value;
        setText(value);

        if (value !== '') {
            timer.current?.cancel();
        } else if (apiStatus === 'idle') {
            timer.current?.start();
        }
    }

    return (
        <div
            id="player-box"
            style={{
                opacity: apiStatus === 'loading' ? 0.3 : 1,
                pointerEvents: apiStatus === 'loading' ? 'none' : 'auto',
                color: apiStatus === 'error' ? 'red' : 'auto'
            }}
        >
            <input
                id="player-text-input"
                value={text}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                onChange={handleInput}
            />
            <button onClick={send}>Send</button>
            {
                apiStatus === 'error' && 'Something is broken 😵‍💫'
            }
        </div>
    )
}