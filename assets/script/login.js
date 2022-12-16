'use strict';

// Utility Functions

import { onEvent, select, selectAll, print } from './util.js';

const overlay = select('.overlay');
setTimeout(() => { overlay.style.display = 'none' }, 750);

function notLoggedIn() {
  const loginBtn = select('.login-btn');
  const incorrect = select('.incorrect');
  
  localStorage.setItem('email', encodeURIComponent('seth@email.com'));
  localStorage.setItem('password', 'password');
  
  onEvent('click', loginBtn, () => {
    const emailInp = select('.email').value;
    const passwordInp = select('.password').value;
    let pass = (encodeURIComponent(emailInp) === localStorage.getItem('email'))
    && (passwordInp === localStorage.getItem('password'));
    if (pass) {
      window.location = 'home.html';
      incorrect.innerText = ''
      localStorage.setItem('loggedIn', 'true');
    } else {
      incorrect.innerText = '*Incorrect Username or Password*'
    }
  })
}
function loggedIn() {
  window.location = 'home.html';
}

let isLoggedIn = decodeURIComponent(localStorage.getItem('loggedIn')) === 'true';
if (!isLoggedIn) {
  notLoggedIn()
} else {
  loggedIn();
}