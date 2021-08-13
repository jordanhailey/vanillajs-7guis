export const appendElementToDOM = (element) => {
  return async (el) => {
    try {

    } catch (error) {

    } finally {
      return new Promise((resolve,_)=>{
        setTimeout(()=>{
          element.id = element.id ? element.id : el.closest("[data-module-id]").dataset.moduleId;
          element.tabIndex = Number(element.tabIndex) >= 0 ? element.tabIndex : -1;
          element.classList.add("focusable");
          el.appendChild(element);
          resolve(el);
        },0)
      })
    }
  }
}
