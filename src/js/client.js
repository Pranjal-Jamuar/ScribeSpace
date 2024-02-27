"use strict"

import { NavItem } from "./components/NavItem.js"
import { activeNotebook } from "./utils.js"

const sidebarList = document.querySelector("[data-sidebar-list]")
const notePanelTitle = document.querySelector("[data-note-panel-title]")

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
    },

    /**
     * @param {Array<object>} notebookList - List of notebook data to display
     */
    read(notebookList) {
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
  },
}
