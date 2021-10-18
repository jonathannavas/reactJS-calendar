import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let token = '';

Swal.fire = jest.fn();  


const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Test on auth.js', () => {

    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('should test startLogin', async () => {
        await store.dispatch( startLogin('jonathan.navas9@hotmail.com', '123456') )
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        token = (localStorage.setItem.mock.calls[0][1]);
    });

    test('start login incorrect', async () => {
        await store.dispatch( startLogin('jonathan.navas9@hotmail.com', '1234567') )
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Password Incorrect", "error");

        await store.dispatch( startLogin('jonathan.nsavas9@hotmail.com', '123456') )
        actions = store.getActions();
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Email incorrect", "error");

    });

    test('startRegisterCorrect', async () => {

        fetchModule.fetchWithoutToken = jest.fn(()=> ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'gabo',
                    token: 'assada12312dsa2'
                }
            }
        }));

        await store.dispatch( startRegister('testfer@gmail.com', '1234567', 'JonathanTest')  );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'gabo'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'assada12312dsa2');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })

    test('startChecking correct', async () => {

        fetchModule.fetchWithToken = jest.fn(()=> ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'gabo',
                    token: 'assada12312dsa2'
                }
            }
        }));

        await store.dispatch( startChecking() );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid: '123',
                name: 'gabo',
            }
        })
        
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'assada12312dsa2');

    });
});
