import AppStateProvider from "./app-state/AppStateProvider"
import StoryBodyView from "./views/content-view/StoryBodyView"
import InteractorInputView from "./views/interactor-input-view/InteractorInputView"

function App() {

  return (
    <AppStateProvider>
      Open Stories Playground
      <StoryBodyView />
      <InteractorInputView />
    </AppStateProvider>
  )
}

export default App
