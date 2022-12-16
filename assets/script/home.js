'use strict';

// Util Functions

import { onEvent, select, selectAll, print, create } from "./util.js";

const label = select('.label-p');
const imgInput = select('.img-input');
const textInput = select('textarea');
const postIt = select('.post');
const area = select('.posts-place')
const followSect = select('.followers');
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

async function getUsers() {
  try {
    console.log(url)
    const result = await fetch(url, options);

    if (result.status >= 200 && result.status < 400) {
      const data = await result.json();
      console.log(data)
      const followers = data.results;
      console.log(followers)
      

      createFollower(followers)

    }
  } catch(error) {
    console.log(error)
  }
}

function createFollower(arr) {
  arr.forEach(user => {
    let pic = user.picture.thumbnail;
    let name = `${user.name.first} ${user.name.last}`
    let province = user.location.state;
    switch (province) {
      case 'Manitoba':
        province = 'MB';
        break;
      case 'Saskatchewan':
        province = 'SK';
        break;
      case 'British Columbia':
        province = 'BC';
        break;
      case 'Alberta':
        province = 'AB';
        break;
      case 'Ontario':
        province = 'ON';
        break;
      case 'New Brunswick':
        province = 'NB';
        break;
      case 'Newfoundland and Labrador':
        province = 'NL';
        break;
      case 'Northwest Territories':
        province = 'NT';
        break;
      case 'Nova Scotia':
        province = 'NS';
        break;
      case 'Nunavut':
        province = 'NU';
        break;
      case 'Prince Edward Island':
        province = 'PEI';
        break;
      case 'Québec':
        province = 'QC';
        break;
      case 'Yukon':
        province = 'YT';
        break;
    }
    let city = `${user.location.city}, ${province}`
    addFollower(pic, name, city)
  })
}

function addFollower(img, name, location) {
  let el = create('div');
  el.classList.add('follower');
  el.classList.add('flex');
  let html = `<img class="small" src="${img}" alt="person">
              <div>
                <p class="name">${name}</p>
                <p class="location">${location}</p>
              </div>`;
                
  console.log(html);
  el.innerHTML = html;
  followSect.append(el)
}
              
getUsers()

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