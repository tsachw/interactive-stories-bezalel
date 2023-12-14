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
    status: 'idle' | 'loading' | 'error';
}

const initAppState: AppState = {
    instructions: 'Something..',
    messages: [
        { role: 'system', content: CONFIG.instructions },
        { role: 'assistant', content: CONFIG.openingLine }
    ],
    status: 'idle'
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





