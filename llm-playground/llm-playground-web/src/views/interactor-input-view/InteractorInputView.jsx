import { useCallback, useEffect, useRef, useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import "./interactor-input-styles.css";
import { SETTINGS } from "../../../settings";
import Timer from "../../utils/timer";

export default function InteractorInputView() {

    const { messages, status, showCallToAction, callToAction } = useAppState();
    const setAppState = useSetAppState();
    const [newMsg, setNewMsg] = useState('');
    const idleTimer = useRef(new Timer(10000, () => setAppState({ showCallToAction: true })));

    const send = useCallback(() => {

        const newMessages = [...messages, { role: 'user', content: newMsg }];

        if (!isNaN(parseInt(newMsg))) {
            newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMsg} words.` })
        }

        setAppState({ messages: newMessages, status: 'loading', callToAction: '', showCallToAction: false });
        setNewMsg('');

        fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${SETTINGS.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4-1106-preview',
                    messages: newMessages,
                    response_format: { type: "json_object" },
                    temperature: 1, // deterministic 0-2 random
                    // todo: what is "Maximum length ('max_tokens')"? what is "Stop sequence ('stop')"?
                })
            }
        ).then(response => response.json()
        ).then(data => {
            try {
                let storytellerResponse = data.choices[0].message.content;
                storytellerResponse = JSON.parse(storytellerResponse);
                console.log(storytellerResponse);

                setAppState({
                    messages: [
                        ...newMessages,
                        { role: 'assistant', content: storytellerResponse.storyText }
                    ],
                    callToAction: storytellerResponse.callToAction,
                    status: 'idle'
                })

                idleTimer.current.start();
            } catch { err => { throw err } }
        }).catch(err => {
            console.error('Api error. Details: ', err);
            setAppState({ status: 'error' });
        })

    }, [messages, newMsg]);

    useEffect(() => {
        idleTimer.current.cancel();
    }, [newMsg])

    return (
        <div
            id="interactor-box"
            style={{
                opacity: status === 'loading' ? 0.3 : 1,
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                color: status === 'error' ? 'red' : 'auto'
            }}
        >
            <input
                id="interactor-text-input"
                value={newMsg}
                placeholder={showCallToAction ? `(tip) ${callToAction}` : ''}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                onChange={e => setNewMsg(e.target.value)}
            />
            <button onClick={send}>Send</button>
            {
                status === 'error' && 'Something is broken 😵‍💫'
            }
        </div>
    )
}