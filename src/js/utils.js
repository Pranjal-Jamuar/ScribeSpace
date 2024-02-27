"use strict"

/**
 *
 * @param {Array<HTMLElement>} elements
 * @param {string} eventType
 * @param {Function} callback
 */

const addEventOnelements = function (elements, eventType, callback) {
  elements.forEach(element => element.addEventListener(eventType, callback))
}

/**
 *
 * @param {number} currentHour
 * @returns {string} A greeting message with a salutation corresponding to the time of the day
 */

const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night"

  return `Good ${greeting}`
}

let lastActiveNavitem
const activeNotebook = function () {
  lastActiveNavitem?.classList.remove("active")
  this.classList.add("active")
  lastActiveNavitem = this
}

/**
 *
 * @param {HTMLElement} element - The DOM element to make it editable
 */

const makeElementEditable = function (element) {
  element.setAttribute("contenteditable", true)
  element.focus()
}

/**
 * generates unique ID on the basis of the current timestamp
 *
 * @returns {string} A string representation of the current timestamp.
 */
const generateID = function () {
  return new Date().getTime().toString()
}

export {
  addEventOnelements,
  getGreetingMsg,
  activeNotebook,
  makeElementEditable,
  generateID,
}
