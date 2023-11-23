import { useAppState } from "../../app-state/AppStateProvider"

export default function StoryBodyView() {
    const { instructions } = useAppState();

    return (<main>
        <h4>Story body view</h4>
        <span>Instructions:</span>{instructions}
    </main>)
}