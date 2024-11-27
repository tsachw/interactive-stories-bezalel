import { useState } from "react";
import { postMessages } from "./story-api";
import StoryBodyView from "./components/content-view/StoryBodyView";
import PlayerInput from "./components/player-input/PlayerInput";
import { STORY_CONFIG_DEV as storyConfig } from './story-config';

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.callToAction }
    ]);
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
    const [response, setResponse] = useState(null); // see responseSchema @ story-config

    function addMessage(newMsg) {
        setMessages(currentMsgs => [...currentMsgs, newMsg])
    }

    function handleInactivity() {
        if (!response) return;

        if (Math.random() > 0.6) {
            // Trigger an independent story event:
            addMessage({ role: 'assistant', content: response.storyEvent });
        } else {
            // Apply call to action hint:
            addMessage({ role: 'assistant', content: response.callToAction });
        }
    }

    function handleSend(playerText) {
        const newMessages = [...messages];
        newMessages.push({ role: 'user', content: playerText });
        setMessages(newMessages);

        setStatus('loading');
        postMessages(newMessages, handleResponse);
    }

    function handleResponse(result, error) {
        if (!result || error) {
            setStatus('error');
            return;
        }

        setStatus('idle');
        setResponse(result);
        addMessage({ role: 'assistant', content: result.storyText });

        // Test modifying the words limit:
        // if (...) {
        //     newMessages.push({ role: 'system', content: `Your next storyText output has maximum length of ${newMessage} words.` })
        // }

        // TODO: end story with a long closing paragraph, and 'THE END' message.
        console.log('goal progress: ', result.goalProgress);

    }

    return (
        <>
            <h3>
                {storyConfig.name || 'Open Story'}
            </h3>
            <StoryBodyView apiStatus={apiStatus} messages={messages} />
            <PlayerInput
                apiStatus={apiStatus}
                onSend={handleSend}
                onInactivity={handleInactivity}
            />
        </>
    )
}

export default App