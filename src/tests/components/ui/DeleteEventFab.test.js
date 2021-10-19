import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();
const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
);

describe('Tests on DeleteEventFab.js', () => {
    test('should make a snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('Should call eventStartDelete', () => {
        wrapper.find('.fab-danger').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalled();
    });
});
