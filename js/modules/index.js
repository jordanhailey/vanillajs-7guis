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
      module = await import("./counter/counter.js").then(mod=>mod.default);
      break;
    default:
      break;
  }
  return appendElementToDOM(module);
}
export default fetchModule;
