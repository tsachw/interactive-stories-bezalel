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
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'ended' | 'error'
    const [response, setResponse] = useState(null); // see responseSchema @ story-config
    const [storyShouldEnd, setStoryShouldEnd] = useState(false);

    function addMessage(newMsg) {
        setMessages(currentMsgs => [...currentMsgs, newMsg])
    }

    function handleInactivity() {
        if (!response) return;
        // console.log('engagement:', response.playerEngagement);
        if (response.playerEngagement <= 0.6) {
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

    function handleResponse(res, error) {
        if (!res || error) {
            setStatus('error');
            return;
        }

        addMessage({ role: 'assistant', content: res.storyText });

        if (storyShouldEnd) {
            setStatus('ended');
            addMessage({ role: 'assistant', content: 'THE END.' });
            return;
        }

        setStatus('idle');
        setResponse(res);

        // Example: reacting to player sentiment:
        // console.log(res.playerSentiment);
        // if (res.playerSentiment.includes('sadness')) {
        //     addMessage({ role: 'system', content: `The following storyText should make the player laugh.` })
        // }

        // Ending condition:
        // console.log('goal progress: ', res.goalProgress);
        if (res.goalProgress >= 0.9) {
            addMessage({ role: 'system', content: `The following storyText should end the story. Use up to 50 words to write an epilogue.` })
            setStoryShouldEnd(true);
        }

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