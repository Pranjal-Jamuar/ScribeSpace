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

/**
 *
 * @param {object} db - the database containing the notebooks
 * @param {string} notebookId - ID of the notebook to find
 * @returns {object | undefined} The found notebook object, or undefined if not found
 */

const findNotebook = function (db, notebookId) {
  return db.notebooks.find(notebook => notebook.id === notebookId)
}

/**
 *
 * @param {object} db - the objedct containing the array of notebooks.
 * @param {string} notebookId - ID of the notebook to find.
 * @returns {number} The index of the found notebook or -1 if not found.
 */

const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex(item => item.id === notebookId)
}

/**
 *
 * @param {number} ms - the timestamp in milliseconds to convert.
 * @returns {string} - A string representing the relative time.
 */
const getRelativeTime = ms => {
  const currentTime = new Date().getTime()

  const minute = Math.floor((currentTime - ms) / 1000 / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} mins ago`
    : hour < 24
    ? `${hour} hours ago`
    : `${day} days ago`
}

/**
 *
 * @param {Object} db
 * @param {string} noteID
 * @returns {Object | undefined} The found note object or undefined if not found.
 */
const findNote = (db, noteID) => {
  let note
  for (const notebook of db.notebooks) {
    note = notebook.notes.find(note => note.id === noteID)
    if (note) break
  }
  return note
}

/**
 *
 * @param {object} notebook
 * @param {string} noteID
 * @returns {number} The index of the found note or -1 if not found
 */
const findNoteIndex = (notebook, noteID) => {
  return notebook.notes.findIndex(note => note.id === noteID)
}

export {
  addEventOnelements,
  getGreetingMsg,
  activeNotebook,
  makeElementEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex,
}
