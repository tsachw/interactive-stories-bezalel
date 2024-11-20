import { useState } from "react";
import { STORY_CONFIG_DEV as storyConfig } from './story/story-config';
import StoryBodyView from "./components/content-view/StoryBodyView";
import PlayerInput from "./components/player-input/PlayerInput";
import { postMessages } from "./api/story-api";
import { usePlayerInactivity } from "./story/story-logic";

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.callToAction }
    ]);
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
    const [currentResponse, setCurrentResponse] = useState(null);

    const handleInactivity = usePlayerInactivity(messages, setMessages, currentResponse);

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
            setCurrentResponse(result);

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