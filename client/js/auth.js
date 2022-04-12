const jwt_decode = require('jwt-decode');

// Checks whether the api is running from localhost or heroku and changes accordingly
const url = window.location.hostname.includes('localhost')
    ? 'http://localhost:3000'
    : '(link for heroku)';

async function requestLogin(e) {
    e.preventDefault();
    try {
        const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
		};
        const resp = await fetch(`${url}/login`, options);
        const data = await resp.json();
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const resp = await fetch(`${url}/register`, options)
        const data = await resp.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    const token = data.token.split(" ")[1];
    const payload = jwt_decode(token);
    localStorage.setItem('username', payload.username);

}
