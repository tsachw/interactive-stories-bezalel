import { SETTINGS } from "../settings"
import AppStateProvider from "./app-state/AppStateProvider"
import StoryBodyView from "./views/content-view/StoryBodyView"
import InteractorInputView from "./views/interactor-input-view/InteractorInputView"

function App() {

  return (
    <AppStateProvider>
      <h3>
        {SETTINGS.STORY_CONFIG.name || 'Open Story'}
      </h3>
      <StoryBodyView />
      <InteractorInputView />
    </AppStateProvider>
  )
}

export default App
