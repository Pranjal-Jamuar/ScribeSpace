"use strict"

import { NavItem } from "./components/NavItem.js"
import { activeNotebook } from "./utils.js"
import { Card } from "./components/Card.js"

const sidebarList = document.querySelector("[data-sidebar-list]")
const notePanelTitle = document.querySelector("[data-note-panel-title]")
const notePanel = document.querySelector("[data-note-panel]")
const noteCreateBtns = document.querySelectorAll("[data-note-create-btn]")
const emptyNotesTemplate = `<div class="empty-notes">
    <span class="material-symbols-rounded" aria-hidden="true"
    >note_stack</span>
    <div class="text-headline-small">No notes</div>
  </div> `

const disableNoteCreateBtns = isNotebookPresent => {
  noteCreateBtns.forEach(item => {
    item[isNotebookPresent ? "removeAttribute" : "setAttribute"]("disabled", "")
  })
}

/**
 * @namespace
 * @property {object} notebook - for managing notebooks in the UI
 * @property {object} note - managing notes in the UI
 */

export const client = {
  notebook: {
    /**
     *
     * @param {object} notebookData - Data representing the new notebook.
     */
    create(notebookData) {
      const navItem = NavItem(notebookData.id, notebookData.name)
      sidebarList.appendChild(navItem)
      activeNotebook.call(navItem)
      notePanelTitle.textContent = notebookData.name
      notePanel.innerHTML = emptyNotesTemplate
      disableNoteCreateBtns(true)
    },

    /**
     * @param {Array<object>} notebookList - List of notebook data to display
     */
    read(notebookList) {
      disableNoteCreateBtns(notebookList.length)
      notebookList.forEach((notebookData, index) => {
        const navItem = NavItem(notebookData.id, notebookData.name)

        if (index === 0) {
          activeNotebook.call(navItem)
          notePanelTitle.textContent = notebookData.name
        }

        sidebarList.appendChild(navItem)
      })
    },

    /**
     *
     * @param {string} notebookId - id of the notebook to be updated
     * @param {Object} notebookData - new data for the notebook
     */
    update(notebookId, notebookData) {
      const oldNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      )
      const newNotebook = NavItem(notebookData.id, notebookData.name)

      notePanelTitle.textContent = notebookData.name
      sidebarList.replaceChild(newNotebook, oldNotebook)
      activeNotebook.call(newNotebook)
    },

    /**
     *
     * @param {string} notebookId - ID of the notebook to be deleted
     */
    delete(notebookId) {
      const deletedNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      )
      const activeNavitem =
        deletedNotebook.nextElementSibling ??
        deletedNotebook.previousElementSibling

      if (activeNavitem) {
        activeNavitem.click()
      } else {
        notePanelTitle.innerHTML = ""
        notePanel.innerHTML = ""
        disableNoteCreateBtns(false)
      }

      deletedNotebook.remove()
    },
  },

  note: {
    create(noteData) {
      //Clear emptyNotesTemplate from notePanel when notes exist
      if (!notePanel.querySelector("[data-note]")) {
        notePanel.innerHTML = ""
      }

      //Append card in notePanel
      const card = Card(noteData)
      notePanel.prepend(card)
    },

    read(noteList) {
      if (noteList.length) {
        notePanel.innerHTML = ""

        noteList.forEach(noteData => {
          const card = Card(noteData)
          notePanel.appendChild(card)
        })
      } else {
        notePanel.innerHTML = emptyNotesTemplate
      }
    },

    update(noteID, noteData) {
      const oldCard = document.querySelector(`[data-note="${noteID}"]`)
      const newCard = Card(noteData)
      notePanel.replaceChild(newCard, oldCard)
    },

    /**
     *
     * @param {string} noteID
     * @param {boolean} doesNoteExists
     */
    delete(noteID, doesNoteExists) {
      document.querySelector(`[data-note="${noteID}"]`).remove()
      if (!doesNoteExists) notePanel.innerHTML = emptyNotesTemplate
    },
  },
}
