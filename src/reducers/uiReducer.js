import { types } from "../types/types";
const initialState = {
    modalOpen:false
};
export const uiReducer = (state = initialState, action) => {

    // TODO: Aqui se hace el switch de los types

    switch (action.type) {

        case types.uiOpenModal:
            return{
                ...state,
                modalOpen: true
            };
        case types.uiCloseModal:
            return{
                ...state,
                modalOpen: false
            }

        default:
            return state;
    }


}