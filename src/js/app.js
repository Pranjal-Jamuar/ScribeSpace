"use strict"

import { addEventOnelements, getGreetingMsg } from "./utils.js"

const $sidebar = document.querySelector("[data-sidebar]")
const $sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]")
const $overlay = document.querySelector("[data-sidebar-overlay]")

addEventOnelements($sidebarTogglers, "click", function () {
  $sidebar.classList.toggle("active")
  $overlay.classList.toggle("active")
})

const greetElement = document.querySelector("[data-greeting]")
const currentHour = new Date().getHours()
greetElement.textContent = getGreetingMsg(currentHour)

const currentDateElement = document.querySelector("[data-current-date]")
currentDateElement.textContent = new Date().toDateString().replace(" ", ", ")
