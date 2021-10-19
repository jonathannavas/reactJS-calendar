import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';
import { act } from 'react-dom/test-utils';

Storage.prototype.setItem = jest.fn();

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initState = {
    calendar: {
        events: [],
    },
    auth: {
        uid: '1234',
        name: 'Jonathan'
    },
    ui: {
        openModal: false
    }
};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe('Test on CalendarScreen', () => {
    test('should to matchSnapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });
    test('should test calendar events', () => {
        const calendar = wrapper.find('Calendar');
        const calendarMsg = calendar.prop('messages');
        expect( calendarMsg ).toEqual( messages );
        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });
        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hola' });

        act(()=> {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
        });
    });
});
