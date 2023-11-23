import { createContext, useReducer } from "react"

const initAppState = {
    instructions: '',
    counter: 1,
    messages: []
}

function appStateReducer(state, action) {
    switch (action.type) {
        case 'addMessage':
            return { ...state, messages: [...state.messages].push(action.payload) };
        case 'cleareMessages':
            return { ...state, messages: [] };
        case 'setCounter':
            return { ...state, counter: action.setter(state.counter) }
        default:
            return { ...state };
    }
}

export const AppState = createContext(initAppState);
export const AppStateUpdater = createContext(null);

export default function AppStateProvider({ children }) {
    const [appState, dispatch] = useReducer(appStateReducer, initAppState);

    return <AppState.Provider value={appState}>
        <AppStateUpdater.Provider value={dispatch}>
            {children}
        </AppStateUpdater.Provider>
    </AppState.Provider>
}