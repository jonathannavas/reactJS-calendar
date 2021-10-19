import { authReducer } from "../../../reducers/authReducer";
import { types } from "../../../types/types";

const initState = {
    checking: true
}

describe('Test on authReducer', () => {
   
    test('should return the default state', () => {
        const action = {};
        const state = authReducer(initState, action);
        expect( state ).toEqual( initState );
    });

    test('should authenticate de user', () => {
        const action =  {
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'Jonathan'
            }
        }
        const state = authReducer( initState, action );
        expect(state).toEqual({ checking: false, uid: '1234', name: 'Jonathan' });
    });

    test('should logout', () => {
        const action = { 
            type: types.authLogout
        };
        const state = authReducer( initState, action );
        expect(state).toEqual({ checking: false });
    });

});
