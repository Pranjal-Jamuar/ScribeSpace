"use strict"

import { Tooltip } from "./Tooltip.js"
import { activeNotebook, makeElementEditable } from "../utils.js"
import { database } from "../db.js"
import { client } from "../client.js"

const notePanelTitle = document.querySelector("[data-note-panel-title]")

/**
 *
 * @param {string} id - Unique ID of th notebook
 * @param {string} name - Name of the notebook
 * @returns {HTMLElement} - Element representing the navigation item of the notebook
 */

export const NavItem = function (id, name) {
  const navItem = document.createElement("div")
  navItem.classList.add("nav-item")
  navItem.setAttribute("data-notebook", id)

  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field>${name}</span>
    <button
      class="icon-btn small"
      aria-label="Edit notebook"
      data-tooltip="Edit notebook"
      data-edit-btn
    >
      <span class="material-symbols-rounded" aria-hidden="true">edit</span>
      <div class="state-layer"></div>
    </button>

    <button
      class="icon-btn small"
      aria-label="Delete notebook"
      data-tooltip="Delete notebook"
      data-delete-btn
    >
      <span class="material-symbols-rounded" aria-hidden="true">delete</span>
      <div class="state-layer"></div>
    </button>
    <div class="state-layer"></div>
  `

  //Show Tooltip on edit and delete button
  const tooltipElements = navItem.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach(elem => Tooltip(elem))

  navItem.addEventListener("click", function () {
    notePanelTitle.textContent = name
    activeNotebook.call(this)
  })

  /**
   * Notebook edit functionality
   */
  const navItemEditBtn = navItem.querySelector("[data-edit-btn]")
  const navItemField = navItem.querySelector("[data-notebook-field]")

  navItemEditBtn.addEventListener(
    "click",
    makeElementEditable.bind(null, navItemField)
  )
  navItemField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      this.removeAttribute("contenteditable")

      //Update edited data in database
      const updatedNotebookData = database.update.noteboook(
        id,
        this.textContent
      )

      //Render updated notebook
      client.notebook.update(id, updatedNotebookData)
    }
  })
  return navItem
}
