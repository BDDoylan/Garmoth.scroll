import { createStore } from "vuex";
import Scrolls from "./Modules/Scrolls";
import Enhancing from "./Modules/Enhancing";

// Create a new store instance.
const store = createStore({
	modules: {
		scroll: Scrolls,
		enhance: Enhancing,
	},
});

export default store;
