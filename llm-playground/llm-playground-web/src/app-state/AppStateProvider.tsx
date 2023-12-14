/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import { STORY_CONFIG2 as CONFIG } from '../story-configurations/configuration-1';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string
}

type AppState = {
    instructions: string;
    messages: Message[];
}

/////////// TEMP!! ///////////
const conversation: Message[] = [
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
    { role: 'user', content: 'Hi there! I need help with a programming problem.' },
    { role: 'assistant', content: 'Of course! What specific issue are you facing?' },
    { role: 'user', content: 'I\'m getting an error when trying to access an undefined variable.' },
    { role: 'assistant', content: 'Could you provide a snippet of the code where the error is occurring?' },
    { role: 'user', content: 'Sure, here it is:\n\nconst result = someFunction(undefinedVariable);' },
    { role: 'assistant', content: 'I see. It looks like `undefinedVariable` is not defined. You might want to declare or initialize it before using it.' },
    { role: 'user', content: 'Oh, I missed that! Thanks for pointing it out.' },
    // ... continue the conversation with more messages
    { role: 'assistant', content: 'Is there anything else I can help you with?' },
    { role: 'user', content: 'No, that\'s all for now. Thanks for your assistance!' },
    { role: 'assistant', content: 'You\'re welcome! If you have more questions in the future, feel free to ask. Have a great day!' },
];

// Ensure the conversation has a total of 60 messages
while (conversation.length < 60) {
    const randomRole = Math.random() < 0.5 ? 'assistant' : 'user';
    const randomContent = getRandomMessage();
    conversation.push({ role: randomRole, content: randomContent });
}

// Function to generate random user and assistant messages
function getRandomMessage() {
    const messages = [
        'I have a question about a software tool.',
        'Can you recommend a good book on programming?',
        'How does the latest technology work?',
        'I\'m curious about artificial intelligence.',
        'What\'s your favorite programming language?',
        'Tell me a joke!',
        // ... add more random messages as needed
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}
/////////// TEMP!! ///////////

const initAppState: AppState = {
    instructions: 'Something..',
    messages: [
        { role: 'system', content: CONFIG.instructions },
        { role: 'assistant', content: CONFIG.openingLine },
        ...conversation
    ]
}

const AppStateContext = createContext(initAppState);
const AppStateReducerContext = createContext<Dispatch<SetStateAction<AppState>>>(() => null);

export default function AppStateProvider({ children }: PropsWithChildren) {
    const [appState, setAppState] = useState(initAppState);

    return (
        <AppStateContext.Provider value={appState}>
            <AppStateReducerContext.Provider value={setAppState}>
                {children}
            </AppStateReducerContext.Provider>
        </AppStateContext.Provider>
    )
}

export function useAppState() { return useContext(AppStateContext) }
export function useSetAppState() {
    const set = useContext(AppStateReducerContext);
    return (newState: Partial<AppState>) => {
        set(currentState => ({ ...currentState, ...newState }));
    }
}





