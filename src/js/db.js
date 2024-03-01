"use strict"

import {
  generateID,
  findNotebook,
  findNotebookIndex,
  findNote,
} from "./utils.js"

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

    /**
     *
     * @function
     * @param {string} notebookId - The ID of the notebook to add.
     * @param {Object} object - The note object to add.
     * @returns {Object} The newly created note.
     */
    note(notebookId, object) {
      readDataBase()

      const notebook = findNotebook(keepNotesDataBase, notebookId)
      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime(),
      }

      notebook.notes.unshift(noteData)
      writeDataBase()

      return noteData
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

    /**
     *
     * @function
     * @param {string} notebookId - The ID of the notebook to retrieve notes from.
     * @returns {Array<Object>} Aan array of  note objects.
     */
    note(notebookId) {
      readDataBase()

      const notebook = findNotebook(keepNotesDataBase, notebookId)
      return notebook.notes
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

    /**
     *
     * @param {string} noteID
     * @param {Object} object
     * @returns {Object} The updated note object
     */
    note(noteID, object) {
      readDataBase()

      const oldNote = findNote(keepNotesDataBase, noteID)
      const newNote = Object.assign(oldNote, object)

      writeDataBase()

      return newNote
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
