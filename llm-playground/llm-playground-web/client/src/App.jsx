import { useState } from "react";
import { postMessages } from "./story-api";
import StoryBodyView from "./components/content-view/StoryBodyView";
import PlayerInput from "./components/player-input/PlayerInput";
// import { storyConfig } from './story-config';
// import { storyConfig } from './examples/story-config-01-birdwatching';
import { storyConfig } from './examples/story-config-02-a-late-divorce';

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.firstCallToAction }
    ]);
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'ended' | 'error'
    const [response, setResponse] = useState(null); // see responseSchema @ response-schema
    const [storyShouldEnd, setStoryShouldEnd] = useState(false);

    function addMessage(newMsg) {
        setMessages(currentMsgs => [...currentMsgs, newMsg])
    }

    function handleInactivity() {
        if (!response) return;

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

    function handleResponse({ messages, response, error }) {
        if (!response || error) {
            setStatus('error');
            return;
        }

        addMessage({ role: 'assistant', content: response.storyText });

        if (storyShouldEnd) {
            setStatus('ended');
            addMessage({ role: 'assistant', content: 'THE END.' });
            return;
        }

        setStatus('idle');
        setResponse(response);

        // console.log(res.playerSentiment);
        console.log('engagement:', response.playerEngagement);
        console.log('goal progress: ', response.goalProgress);

        // Example: reacting to player sentiment:
        // if (res.playerSentiment.includes('sadness')) {
        //     addMessage({ role: 'system', content: `The following storyText should make the player laugh.` })
        // }

        // Ending condition:
        if (response.goalProgress >= 0.9) {
            addMessage({ role: 'system', content: `The following storyText should end the story. Use up to 50 words to write an epilogue.` })
            setStoryShouldEnd(true);
        }

    }

    return (
        <>
            <h1>
                {storyConfig.name || 'Open Story'}
            </h1>
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