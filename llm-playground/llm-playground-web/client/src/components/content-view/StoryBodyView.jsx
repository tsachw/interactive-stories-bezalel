import { useEffect, useRef } from "react";
import LoadingDots from "../LoadingDots";
import './story-body-styles.css';

export default function StoryBodyView({ messages, apiStatus }) {


    useEffect(() => {
        if (messages.length > 2) {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth' // Optional: Add smooth scrolling effect
            });
        }
    }, [messages])

    return (
        <main id="main-cont">
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
