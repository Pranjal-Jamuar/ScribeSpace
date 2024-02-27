"use strict"

import { generateID, findNotebook, findNotebookIndex } from "./utils.js"

let keepNotesDataBase = {}
const initDataBase = function () {
  const database = localStorage.getItem("keepNotesDataBase")

  if (database) {
    keepNotesDataBase = JSON.parse(database)
  } else {
    keepNotesDataBase.notebooks = []
    localStorage.setItem("keepNotesDataBase", JSON.stringify(keepNotesDataBase))
  }
}

initDataBase()

/**
 * reads and loads the localStorage data in to the global variable `keepNotesDataBase`.
 */

const readDataBase = function () {
  keepNotesDataBase = JSON.parse(localStorage.getItem("keepNotesDataBase"))
}

/**
 * writes the current state of the global variable `keepNotesDataBase` to the localStorage.
 */

const writeDataBase = function () {
  localStorage.setItem("keepNotesDataBase", JSON.stringify(keepNotesDataBase))
}

/**
 * @namespace
 * @property {object} get - retrieving data from the database
 * @property {object} post - adding data to the database
 * @property {object} update - updating data to the database
 * @property {object} delete - deleting data from the database
 *
 */

export const database = {
  post: {
    /**
     *
     * @function
     * @param {string} name - name of the new notebook
     * @returns {object} - newly created notebook object
     */
    notebook(name) {
      readDataBase()
      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      }

      keepNotesDataBase.notebooks.push(notebookData)

      writeDataBase()

      return notebookData
    },
  },
  get: {
    /**
     * @function
     * @returns {Array<object>} An array of notebook objects.
     */
    notebook() {
      readDataBase()

      return keepNotesDataBase.notebooks
    },
  },
  update: {
    /**
     * @function
     * @param {string} notebookId - the id to update
     * @param {string} name - the new name
     * @returns {object} - updated notebook object
     */
    noteboook(notebookId, name) {
      readDataBase()

      const notebook = findNotebook(keepNotesDataBase, notebookId)
      notebook.name = name

      writeDataBase()

      return notebook
    },
  },
  delete: {
    notebook(notebookId) {
      readDataBase()

      const notebookIndex = findNotebookIndex(keepNotesDataBase, notebookId)
      keepNotesDataBase.notebooks.splice(notebookIndex, 1)

      writeDataBase()
    },
  },
}
