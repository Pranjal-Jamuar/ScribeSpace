"use strict"

/**
 *
 * @param {Array<HTMLElement>} $elements
 * @param {string} eventType
 * @param {Function} callback
 */

const addEventOnelements = function ($elements, eventType, callback) {
  $elements.forEach($element => $element.addEventListener(eventType, callback))
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

export { addEventOnelements, getGreetingMsg }
