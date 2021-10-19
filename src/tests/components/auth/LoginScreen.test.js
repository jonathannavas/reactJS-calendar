import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';


Swal.fire = jest.fn();


jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);


describe('Test on Login Screen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should match with the snapshot', ()=> {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call dispatch login', () => {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'jonathan.navas9@hotmail.com'
            }
        });
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLogin).toHaveBeenCalledWith('jonathan.navas9@hotmail.com', '123456');

    });

    test('Dont save data if the password is diferent', () => {
     
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '12345'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startRegister).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Both password must be the same', 'error');

    });

    test('Should call register form', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '12345'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '12345'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( Swal.fire ).not.toHaveBeenCalled();
        expect( startRegister ).toHaveBeenCalledWith("gabo.navas9@hotmail.com", "12345", "Gabo");

    })

});
