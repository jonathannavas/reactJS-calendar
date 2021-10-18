import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe('Test on helper fetch.js', () => {
    
    let token = '';

    test('fetch should work without token', async () => {
        const resp = await fetchWithoutToken('auth', { email: 'jonathan.navas9@hotmail.com', password: '123456' }, 'POST');
        const body = await resp.json();
        expect( resp instanceof Response ).toBe( true );
        expect( body.ok ).toBe(true);
        token = body.token;
    });

    test('fetch should work with token', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchWithToken('events/6167a960e0d78d3bcaf0e604',{}, 'DELETE');
        const body = await resp.json();
        expect( body.msg ).toBe('This event doesnt exists');
    });
    

})
