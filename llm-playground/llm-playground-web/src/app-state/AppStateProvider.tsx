/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import { STORY_CONFIG } from '../story-configurations/configuration-0.1';

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string
}

type AppState = {
    instructions: string;
    messages: Message[];
}

const initAppState: AppState = {
    instructions: 'Something..',
    messages: [
        { role: 'system', content: STORY_CONFIG.instructions },
        { role: 'assistant', content: STORY_CONFIG.welcomeMsg },
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