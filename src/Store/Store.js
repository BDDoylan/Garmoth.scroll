import { createStore } from 'vuex'
import Scrolls from "./Modules/Scrolls";

// Create a new store instance.
const store = createStore({
    modules: {
        scroll: Scrolls,
    }
})

export default store