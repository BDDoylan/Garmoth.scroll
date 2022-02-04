import { createStore } from 'vuex'
import Scrolls from "./Modules/Scrolls";
import Enchancing from './Modules/Enchancing';

// Create a new store instance.
const store = createStore({
    modules: {
        scroll: Scrolls,
        enchance: Enchancing,
    }
})

export default store