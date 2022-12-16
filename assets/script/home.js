'use strict';

// Util Functions

import { onEvent, select, selectAll, print, create } from "./util.js";

const label = select('.label-p');
const imgInput = select('.img-input');
const textInput = select('textarea');
const postIt = select('.post');
const area = select('.posts-place')
textInput.value = '';
imgInput.value = '';

const url = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  mode: 'cors'
}

const followers = fetch(url, options)
.then(response => response.json())
.then(json => json.results)
.catch(console.error);

console.log(followers)

onEvent('change', imgInput, function() {
  label.innerText = imgInput.value.split(/(\\|\/)/g).pop();
})



function createText(text) {
  let html = create('div');
  if (text !== '') {
    html.innerHTML += `<p>${text}</p>`
    return html;
  }
  return html;
}

function createImage(img) {
  let html = create('div');
  if (img !== '') {
    let alt = imgInput.value.split(/(\\|\/)/g).pop()
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img)
    fileReader.addEventListener("load", function () {
      html.innerHTML += `<img src="${this.result}" alt="${alt}">`
    });
    return html;
  }
}

function createPost() {
  let date = new Date().toDateString().slice(3).trim(' ');
  let el = create('div');
  el.classList.add('posted')
  let html = `<div class="post-header flex">
                <div class="avatar smaller"></div>
                <p>Seth Vandenbos</p>
                <p>${date}</p>
              </div>`
  el.innerHTML = html;
  el.append(createImage(imgInput.files[0]))
  el.append(createText(textInput.value))

  return el;
}

function appendPost() {
  let el = createPost();
  area.prepend(el)
}

onEvent('click', postIt, function() {
  if (textInput.value !== '' || imgInput.value !== '') {
    appendPost();
    label.innerText = '';
    textInput.value = '';
    imgInput.value = '';
  }
});