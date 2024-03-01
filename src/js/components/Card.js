"use strict"

import { getRelativeTime } from "../utils.js"
import { Tooltip } from "./Tooltip.js"
import { NoteModal } from "./Modal.js"
import { database } from "../db.js"
import { client } from "../client.js"

/**
 *
 * @param {Object} noteData - Data of the note to be displayed in the card.
 * @returns {HTMLElement} - The generated card element.
 */
export const Card = function (noteData) {
  const { id, title, text, postedOn, notebookID } = noteData
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

  return card
}
