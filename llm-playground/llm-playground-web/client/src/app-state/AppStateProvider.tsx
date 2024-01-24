/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, Dispatch, SetStateAction, PropsWithChildren } from "react"
import { SETTINGS } from "../../settings"

export type Message = {
    role: 'system' | 'user' | 'assistant',
    content: string
}

type AppState = {
    messages: Message[];
    status: 'idle' | 'loading' | 'error';
}

const storyConfig = SETTINGS.STORY_CONFIG;

const initAppState: AppState = {
    messages: [
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.callToAction }
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





