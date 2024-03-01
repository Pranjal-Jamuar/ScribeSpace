"use strict"

import {
  addEventOnelements,
  getGreetingMsg,
  activeNotebook,
  makeElementEditable,
} from "./utils.js"
import { Tooltip } from "./components/Tooltip.js"
import { database } from "./db.js"
import { client } from "./client.js"
import { NoteModal } from "./components/Modal.js"

const sidebar = document.querySelector("[data-sidebar]")
const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]")
const overlay = document.querySelector("[data-sidebar-overlay]")

addEventOnelements(sidebarTogglers, "click", function () {
  sidebar.classList.toggle("active")
  overlay.classList.toggle("active")
})

/**
 * Tooltip Initialisation
 */

const tooltipElements = document.querySelectorAll("[data-tooltip]")
tooltipElements.forEach(elem => Tooltip(elem))

/**
 * Greeting message on the homepage
 */

const greetElement = document.querySelector("[data-greeting]")
const currentHour = new Date().getHours()
greetElement.textContent = getGreetingMsg(currentHour)

const currentDateElement = document.querySelector("[data-current-date]")
currentDateElement.textContent = new Date().toDateString().replace(" ", ", ")

/**
 * Notebook creation on clicking the + icon
 */

const sidebarList = document.querySelector("[data-sidebar-list]")
const addNotebookBtn = document.querySelector("[data-add-notebook]")

const showNotebookField = function () {
  const navItem = document.createElement("div")
  navItem.classList.add("nav-item")

  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>

    <div class="state-layer"></div>
  `
  sidebarList.appendChild(navItem)

  const navItemField = navItem.querySelector("[data-notebook-field]")

  //Activate new created notebook and deactivate the last one.
  activeNotebook.call(navItem)

  //Making Notebook fields content editable
  makeElementEditable(navItemField)

  navItemField.addEventListener("keydown", createNotebook)
}

addNotebookBtn.addEventListener("click", showNotebookField)

const createNotebook = function (event) {
  if (event.key === "Enter") {
    //store the newly created notebook in database
    const notebookData = database.post.notebook(this.textContent || "Untitled")
    this.parentElement.remove()

    //render navItem
    client.notebook.create(notebookData)
  }
}

/**
 * Render existing notebook list by retrieving data from the database and passing it to the client
 */
const renderExistingNotebook = function () {
  const notebookList = database.get.notebook()
  client.notebook.read(notebookList)
}

renderExistingNotebook()

/**
 * Create new note
 *
 * Event Listeners to a collection of DOM elements representing "Create Note" buttons.
 * When a button is pressed, it opens a modal for creating a new note and handles the submission of the new note to the database and client.
 */

const noteCreateBtns = document.querySelectorAll("[data-note-create-btn]")

addEventOnelements(noteCreateBtns, "click", function () {
  //Create and add new modal
  const modal = NoteModal()
  modal.open()
  modal.onSubmit(noteObj => {
    const activeNotebookId = document.querySelector("[data-notebook].active")
      .dataset.notebook

    const noteData = database.post.note(activeNotebookId, noteObj)
    client.note.create(noteData)
    modal.close()
  })
})
