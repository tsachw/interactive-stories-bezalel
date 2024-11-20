import { useEffect, useRef } from "react";
import LoadingDots from "../LoadingDots";
import scrollToBottom from "../../utils/scrollToBottom";
import './story-body-styles.css';

export default function StoryBodyView({ messages, apiStatus }) {

    const mainBodyContRef = useRef();

    useEffect(() => {
        if (mainBodyContRef.current && messages.length > 2) {
            scrollToBottom(mainBodyContRef.current);
        }
    }, [messages])

    return (
        <main ref={mainBodyContRef} id="main-body-cont">
            <div id="text-column-cont">
                {messages.map((msg, i) => {
                    if (msg.role === 'system') return null;
                    return (<p
                        key={'msg' + i}
                        className={`message-${msg.role}`}
                    >
                        {msg.content}
                    </p>
                    )
                })}
                {
                    apiStatus === 'loading' && <LoadingDots />
                }
            </div>
        </main>)
}
