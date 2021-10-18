import { types } from "../../types/types";

describe('Tests on types.js', () => {

    test('Types should be equals', () => {
        expect( types ).toEqual(
            {
                uiOpenModal: '[ui] Open modal',
                uiCloseModal: '[ui] Close modal',

                eventSetActive: '[event] Set active',
                eventLogout: '[event] Logout event',

                eventAddNew: '[event] Add new',
                eventStartAddNew: '[event] Start add new',
                eventClearActiveEvent: '[event] Clear active event',
                eventUpdated: '[event] Event updated',
                eventDeleted: '[event] Event deleted',
                eventLoaded: '[event] Events loaded',

                authCheckingFinished: '[auth] Finish checking login state',
                authStartLogin: '[auth] Start login',
                authLogin: '[auth] Login',
                authStartRegister: '[auth] Start Register',
                authStartTokenRenew: '[auth] Start token renew',
                authLogout: '[auth] Logout'
            }
        );
    });
})