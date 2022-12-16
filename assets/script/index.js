'use strict';

// Utility Functions

import { onEvent, select, selectAll, print } from './util.js';

const loginBtn = select('.login-btn');
const incorrect = select('.incorrect')

localStorage.setItem('email', encodeURIComponent('seth@email.com'));
localStorage.setItem('password', 'password')

console.log(localStorage);

console.log(decodeURIComponent(localStorage.getItem('email')));

onEvent('click', loginBtn, () => {
  console.log('clicked')
  const emailInp = select('.email').value;
  const passwordInp = select('.password').value;
  console.log(passwordInp.value)
  let pass = (encodeURIComponent(emailInp) === localStorage.getItem('email'))
             && (passwordInp === localStorage.getItem('password'))
  if (pass) {
    window.location = 'home.html';
    incorrect.innerText = ''
  } else {
    incorrect.innerText = '*Incorrect Username or Password*'
  }
})