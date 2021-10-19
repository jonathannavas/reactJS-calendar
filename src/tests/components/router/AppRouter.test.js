import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { AppRouter } from '../../../components/routers/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// store.dispatch = jest.fn();


describe('Test on AppRouter.js', () => {
    
    test('Should show wait...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h5').exists() ).toBe(true);
    });

    test('Should show public route...', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe(true);
    });

    test('Should show private route...', () => {

        const initState = {
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '1234',
                name: 'Jonathan'
            }
        };
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
    });

});

