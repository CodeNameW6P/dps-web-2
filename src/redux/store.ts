import { configureStore } from "@reduxjs/toolkit";
import currentPageReducer from "./slices/currentPageSlice";
import formDataReducer from "./slices/formDataSlice";
import formErrorReducer from "./slices/formErrorSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			currentPage: currentPageReducer,
			formData: formDataReducer,
			formError: formErrorReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
