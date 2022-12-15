'use strict';

/*
  Seth Vandenbos
  
  Github | JDM Cars
  Landing Page
*/

// Utility Functions
import { select } from "./util.js";


// Featured
const featured = select('.featured');
const carName = select('.car-name');

function featuredBackground() {
  featured.classList.add('s2000');
  carName.innerText = 'Honda S2000';
  setTimeout(function() {
    featured.classList.remove('s2000');
    featured.classList.add('miata');
    carName.innerText = 'Mazda Miata Mx-5';
  }, 5_000);
  setTimeout(function() {
    featured.classList.remove('miata');
    featured.classList.add('gtr');
    carName.innerText = 'Nissan Skyline R34 GTR';
  }, 10_000);
  setTimeout(function() {
    featured.classList.remove('gtr');
    featured.classList.add('supra');
    carName.innerText = 'Toyota Supra Mk4'
  }, 15_000);

  let keepGoing = setTimeout(function() {
    featured.classList.remove('supra');
    featuredBackground();
  }, 20_000)
}
featuredBackground()