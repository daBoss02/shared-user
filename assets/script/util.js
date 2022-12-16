'use strict';

// Utility Functions

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

function print(selector) {
  console.log(selector);
}

export { onEvent, select, selectAll, print }