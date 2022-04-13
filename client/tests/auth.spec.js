/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../login.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let test;

describe('submit the login form', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        test = require('../js/auth.js');
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('submits form', () => {
        let event;

        beforeEach(() => {
            fetch.resetMocks();
            event = { preventDefault: jest.fn() }
        })

        it('submits login form', async () => {
            await test.requestLogin(event);
        })

        it('it submits register form', async () => {
            await test.requestRegistration(event);
        })

        it('it logs out', async () => {
            await test.logout();
        })


    })
})
