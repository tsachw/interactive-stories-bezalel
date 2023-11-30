import { useAppState } from "../../app-state/AppStateProvider"
import './story-body-styles.css'

export default function StoryBodyView() {
    const { messages } = useAppState();

    return (
        <main id="main-body-cont">
            {messages.map((msg, i) => {
                if (msg.role === 'system') return null;
                return (<p key={'msg' + i}>{msg.content}</p>)
            })}
        </main>)
}