import { useRef, useState } from "react";
import { postMessages } from "./api/story-api";
import StoryBodyView from "./components/content-view/StoryBodyView";
import PlayerInput from "./components/player-input/PlayerInput";
import { STORY_CONFIG_DEV as storyConfig } from './story/story-config';

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.callToAction }
    ]);
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
    const response = useRef(null);

    //@TODO: 
    // try using state and effect for inacivity
    // try storing response in a state and handle it in an effect instead of inside 'handleSent'

    function handleInactivity() {
        if (response.current && (response.current.storyEvent || response.current.callToAction)) {
            let newMessage;

            if (Math.random() > 0.6) {
                // Trigger an independent story event:
                newMessage = { role: 'assistant', content: response.current.storyEvent };
            } else {
                // Apply call to action hint:
                newMessage = { role: 'assistant', content: response.current.callToAction };
            }

            setMessages((messages) => [...messages, newMessage]);
        }
    }

    function handleSend(playerText) {
        const newMessages = [...messages];
        newMessages.push({ role: 'user', content: playerText });
        setMessages(newMessages);

        setStatus('loading');
        postMessages(newMessages, (result, error) => {
            if (!result || error) {
                setStatus('error');
                return;
            }

            setStatus('idle');
            response.current = result;

            if (result.storyText) {
                newMessages.push({ role: 'assistant', content: result.storyText });
                setMessages(newMessages);

                // TODO: end story with a long closing paragraph, and 'THE END' message.
                console.log('goal progress: ', result.goalProgress);
            }
        });
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