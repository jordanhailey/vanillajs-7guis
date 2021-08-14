const GUI_1 = "./counter/index.js";
const GUI_2 = "./temp-converter/index.js";
const GUI_3 = "./flight-booker/index.js";
const GUI_4 = "./timer/index.js";
const GUI_5 = "./crud/index.js";
const GUI_6 = "./circle-drawer/index.js";
const GUI_7 = "./cells/index.js";

const appendElementToDOM = (element) => {
  return async (el) => {
    try {

    } catch (error) {

    } finally {
      return new Promise((resolve,_)=>{
        setTimeout(()=>{
          element.id = element.id ? element.id : el.closest("[data-module]").dataset.module;
          element.tabIndex = Number(element.tabIndex) >= 0 ? element.tabIndex : -1;
          element.classList.add("focusable");
          el.appendChild(element);
          resolve(el);
        },0)
      })
    }
  }
}

async function fetchModule(moduleName) {
  let module;

  switch (moduleName) {
    case "counter":
      module = await import(GUI_1).then(mod=>mod.default);
      break;
    case "temp-converter":
      module = await import(GUI_2).then(mod=>mod.default);
      break;
    case "flight-booker":
      module = await import(GUI_3).then(mod=>mod.default);
      break;
    case "timer":
      module = await import(GUI_4).then(mod=>mod.default);
      break;
    case "crud":
      module = await import(GUI_5).then(mod=>mod.default);
      break;
    case "circle-drawer":
      module = await import(GUI_6).then(mod=>mod.default);
      break;
    case "cells":
      module = await import(GUI_7).then(mod=>mod.default);
      break;
    default:
      break;
  }
  if (module) {return appendElementToDOM(module)};
}
export default fetchModule;
