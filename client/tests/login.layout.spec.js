/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const html = fs.readFileSync(path.resolve(__dirname, "../login.html"), "utf8");

describe('login.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        it('it has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('Tracket Login')
        })

        it('it is linked to the correct css file', () => {
            const cssLink = document.querySelector('head link');
            expect(cssLink).toBeTruthy();
            expect(cssLink.href).toContain('styles.css')
        })
    })

    describe('body', () => {
        describe('header', () => {
            let header;
            let slogan;

            beforeEach(() => {
                header = document.getElementById('header');
                slogan = document.getElementById('slogan');
            })

            it('the main title exists and has the correct title', () => {
                expect(header).toBeTruthy();
                expect(header.textContent).toEqual('TRACKET');
            })

            it('the slogan exists and has the correct message', () => {
                expect(slogan).toBeTruthy();
                expect(slogan.textContent).toEqual('GOT A HABIT? TRACKET!');
            })
        })

        describe('login form', () => {
            let loginForm;
            let usernameInput;
            let passwordInput;
            let loginBtn;
            let forgottenPasswordLink;

            beforeEach(() => {
                loginForm = document.querySelector('#login-form');
                usernameInput = document.getElementById('username');
                passwordInput = document.getElementById('login-password');
                loginBtn = document.getElementById('login-btn');
                forgottenPasswordLink = document.getElementById('forgot-pw-link');
            })

            it('the login form exists', () => {
                expect(loginForm).toBeTruthy();
            });

            it('it has a text input for the username', () => {
                expect(usernameInput).toBeTruthy();
                expect(usernameInput.type).toBe('text');
                expect(usernameInput.name).toEqual('username');
                expect(usernameInput.placeholder).toEqual('Enter Username');
            });

            it('it has an input for password', () => {
                expect(passwordInput).toBeTruthy();
                expect(passwordInput.type).toBe('password');
                expect(passwordInput.name).toEqual('password');
                expect(passwordInput.placeholder).toEqual('Enter Password');
            });

            it('it has a login button', () => {
                expect(loginBtn).toBeTruthy();
                expect(loginBtn.textContent).toEqual('Login');
            })
        })
    })
})
