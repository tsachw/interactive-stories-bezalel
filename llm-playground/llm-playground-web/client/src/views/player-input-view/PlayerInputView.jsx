import "./player-input-styles.css";

export default function PlayerInputView({ status, text, onChange, onSend }) {

    return (
        <div
            id="player-box"
            style={{
                opacity: status === 'loading' ? 0.3 : 1,
                pointerEvents: status === 'loading' ? 'none' : 'auto',
                color: status === 'error' ? 'red' : 'auto'
            }}
        >
            <input
                id="player-text-input"
                value={text}
                onKeyDown={e => { if (e.key === 'Enter') onSend() }}
                onChange={e => onChange(e.target.value)}
            />
            <button onClick={onSend}>Send</button>
            {
                status === 'error' && 'Something is broken 😵‍💫'
            }
        </div>
    )
}