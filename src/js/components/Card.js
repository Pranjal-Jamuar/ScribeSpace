"use strict"

import { getRelativeTime } from "../utils.js"
import { Tooltip } from "./Tooltip.js"
import { DeleteConfirmModal, NoteModal } from "./Modal.js"
import { database } from "../db.js"
import { client } from "../client.js"

/**
 *
 * @param {Object} noteData - Data of the note to be displayed in the card.
 * @returns {HTMLElement} - The generated card element.
 */
export const Card = function (noteData) {
  const { id, title, text, postedOn, notebookId } = noteData
  const card = document.createElement("div")
  card.classList.add("card")
  card.setAttribute("data-note", id)

  card.innerHTML = `
    <h3 class="card-title text-title-medium">${title}</h3>

    <p class="card-text text-body-large">${text}</p>
    <div class="wrapper">
      <span class="card-time text-label-large">${getRelativeTime(
        postedOn
      )}</span>

      <button
        class="icon-btn large"
        aria-label="Delete node"
        data-tooltip="Delete note" 
        data-delete-btn
      >
        <span class="material-symbols-rounded" aria-hidden="true">delete</span>
        <div class="state-layer"></div>
      </button>
    </div>

    <div class="state-layer"></div>
  `

  Tooltip(card.querySelector("[data-tooltip]"))

  card.addEventListener("click", () => {
    const modal = NoteModal(title, text, getRelativeTime(postedOn))
    modal.open()

    modal.onSubmit(noteData => {
      const updatedData = database.update.note(id, noteData)

      //Update the note in the client UI.
      client.note.update(id, updatedData)
      modal.close()
    })
  })

  /**
   * Note Delete Functionality
   *
   * Click event on delete button element within card
   * When clicked, it opens a confirmation modal fir deleting the associated note.
   * If confirmed, it updates the UI and database to remove the note.
   */

  const deleteBtn = card.querySelector("[data-delete-btn]")
  deleteBtn.addEventListener("click", event => {
    event.stopImmediatePropagation()

    const modal = DeleteConfirmModal(title)

    modal.open()

    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        const existingNotes = database.delete.note(notebookId, id)

        //Update the client UI to reflect note deletion
        client.note.delete(id, existingNotes.length)
      }

      modal.close()
    })
  })

  return card
}
