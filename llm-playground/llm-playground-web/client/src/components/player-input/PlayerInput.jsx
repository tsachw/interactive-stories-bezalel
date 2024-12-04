import { useEffect, useRef, useState } from "react";
import "./player-input-styles.css";
import Timer from "../../utils/timer";

export default function PlayerInput({ apiStatus, onSend, onInactivity }) {

    const inputRef = useRef();
    const [text, setText] = useState('');
    const timer = useRef(new Timer(15000)); // Trigger inactivity timeout after X milliseconds

    useEffect(() => {
        // Update the inactivity timer callback:
        timer.current.callBack = onInactivity;
    }, [onInactivity])

    useEffect(() => {
        if (apiStatus === 'idle') {
            timer.current?.start();
            inputRef.current?.focus();
        } else {
            timer.current?.cancel();
        }
    }, [apiStatus])

    function send() {
        if (text != '') {
            onSend(text);
            setText('');
        }
    }

    function restart() {
        window.location.reload();
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

    if (apiStatus !== 'ended') {
        return (
            <div
                id="player-box"
                style={{
                    pointerEvents: apiStatus === 'loading' ? 'none' : 'auto',
                    color: apiStatus === 'error' ? 'red' : 'auto'
                }}
            >
                <input
                    id="player-text-input"
                    ref={inputRef}
                    disabled={apiStatus === 'loading'}
                    value={text}
                    onKeyDown={e => { if (e.key === 'Enter') send() }}
                    onChange={handleInput}
                />
                <button
                    id="send-button"
                    disabled={!text || apiStatus === 'loading'}
                    onClick={send}
                >
                    →
                </button >
                {
                    apiStatus === 'error' && 'Something is broken 😵‍💫'
                }
            </div>
        )
    } else {
        return (<div id="player-box">
            <button id="restart-button" onClick={restart}>Restart</button>
        </div>)
    }
}