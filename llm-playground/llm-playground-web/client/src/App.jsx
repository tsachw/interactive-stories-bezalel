import { useState } from "react";
import { STORY_CONFIG_DEV as storyConfig } from './story/story-config';
import StoryBodyView from "./views/content-view/StoryBodyView";
import PlayerInputView from "./views/player-input-view/PlayerInputView";
import { postMessages } from "./api/story-api";

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.callToAction }
    ]);
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
    const [playerInput, setPlayerInput] = useState('');

    function handleResponse(result, error) {
        console.log(result, error)
        if (!result || error) {
            setStatus('error');
            return;
        }

        setStatus('idle');
        console.log('@TODO: handle result', result);
    }

    function handleSend() {
        const newMessages = [...messages];
        newMessages.push({ role: 'user', content: playerInput });
        setMessages(newMessages);
        setPlayerInput('');

        setStatus('loading');
        postMessages(newMessages, handleResponse);
    }

    return (
        <>
            <h3>
                {storyConfig.name || 'Open Story'}
            </h3>
            {status}
            <StoryBodyView status={status} messages={messages} />
            <PlayerInputView
                status={status}
                text={playerInput}
                onChange={setPlayerInput}
                onSend={handleSend}
            />
        </>
    )
}

export default App
