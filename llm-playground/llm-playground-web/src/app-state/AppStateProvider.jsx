/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

const initAppState = {
    instructions: 'Something..',
    counter: 1,
    messages: []
}

const AppStateContext = createContext(initAppState);
const AppStateReducerContext = createContext(null);

export default function AppStateProvider({ children }) {
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
    return (newState) => {
        set(currentState => ({ ...currentState, ...newState }));
    }
}