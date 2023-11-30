import { useCallback, useState } from "react";
import { useAppState, useSetAppState } from "../../app-state/AppStateProvider";
import "./interactor-input-styles.css";
import { SETTINGS } from "../../../settings";

export default function InteractorInputView() {

    const { messages } = useAppState();
    const setAppState = useSetAppState();
    const [newMsg, setNewMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const send = useCallback(() => {
        const newMessages = [...messages, { role: 'user', content: newMsg }];
        setNewMsg('');
        setIsLoading(true);

        fetch(
            'https://api.openai.com/v1/models',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${SETTINGS.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: newMessages
                })
            }
        )

        setAppState({ messages: newMessages });
    }, [messages, newMsg]);

    return (
        <div
            id="interactor-box"
            style={{
                opacity: isLoading ? 0.3 : 1,
                pointerEvents: isLoading ? 'none' : 'auto'
            }}
        >
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