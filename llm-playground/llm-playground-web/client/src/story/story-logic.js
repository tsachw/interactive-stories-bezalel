import { useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import Timer from '../utils/timer';

export function useHandleStoryResponse() {
    const { inputMessage } = useAppState();
    const setAppState = useSetAppState();
    const idleTimer = useRef();

    useEffect(() => {
        idleTimer.current?.cancel();
    }, [inputMessage]);

    function handleStoryResponse(messages, response) {
        if (!response) return;

        const newMessages = [...messages];

        // console.log(messages);
        // Test modifying the words limit:
        // if (...) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        if (response.storyText) {
            newMessages.push({ role: 'assistant', content: response.storyText });
        }

        setAppState({ messages: [...newMessages] });

        // TODO: end story with a long closing paragraph, and 'THE END' message.
        console.log('goal progress: ', response.goalProgress);

        // If the player is idle for a long period, add some content or a hint to push the story forward.
        idleTimer.current = new Timer(15000, () => {
            if (Math.random() > 0.6) {
                // Trigger an independent story event:
                newMessages.push({ role: 'assistant', content: response.storyEvent });
                setAppState({ messages: [...newMessages] });
            } else {
                // Apply call to action hint:
                newMessages.push({ role: 'assistant', content: response.callToAction });
                setAppState({ messages: [...newMessages] });
            }
        });
        idleTimer.current.start();
    }

    return handleStoryResponse;
}

export function usePlayerInactivity(messages, setMessages, response) {
    // If the player is idle for a long period, add some content or a hint to push the story forward.
    const handlePlayerInactivity = useCallback(() => {
        console.log('no input', response);
        if (response !== null && (response.storyEvent || response.callToAction)) {
            const newMessages = [...messages];

            if (Math.random() > 0.6) {
                // Trigger an independent story event:
                newMessages.push({ role: 'assistant', content: response.storyEvent });
            } else {
                // Apply call to action hint:
                newMessages.push({ role: 'assistant', content: response.callToAction });
            }

            setMessages(newMessages);
        }
    }, [messages, response]);

    return handlePlayerInactivity;
}
