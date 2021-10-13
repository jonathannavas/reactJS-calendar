import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

// TODO: Aqui se combina los reducers 
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
});