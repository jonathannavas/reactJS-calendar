import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';
import Swal from 'sweetalert2';
import { act } from 'react-dom/cjs/react-dom-test-utils.development';

Swal.fire = jest.fn();

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1,'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Alguna nota',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '1234',
        name: 'Jonathan'
    },
    ui: {
        modalOpen: true
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);

describe('Test on CalendarModal.js', () => {

    beforeEach(()=>{
        jest.clearAllMocks();
    });
   
    test('should show a modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('should to call the action update and close modal', () => {
        wrapper.find('form').simulate('submit', {
            prevetDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalledWith();
    });
    
    test('should to show an error if is not a tittle', () => {
        wrapper.find('form').simulate('submit', {
            prevetDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    });

    test('should to create a new event', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '1234',
                name: 'Jonathan'
            },
            ui: {
                modalOpen: true
            }
        };

        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );


        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            prevetDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith( {
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect( eventClearActiveEvent ).toHaveBeenCalled();
    });

    test('should validate dates', () => {
         
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const today = new Date();

        act(()=>{
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });
        
        wrapper.find('form').simulate('submit', {
            prevetDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "La fecha de fin debe ser mayor a la fecha de inicio", "error");

    });
    
});
