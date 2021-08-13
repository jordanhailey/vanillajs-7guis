const counterContainer = document.createElement("div");
counterContainer.setAttribute("aria-label","Counter is at 0");
counterContainer.style = "display:flex;align-items:center;";
const buttonContainer = document.createElement("div");
buttonContainer.style = "display:flex;flex-direction:column";
const counterAmt = document.createElement("span");
counterAmt.setAttribute("aria-live","polite");
const counterInc = document.createElement("button");
counterInc.innerText = "Increment Counter";
const counterDec = document.createElement("button");
counterDec.innerText = "Decrement Counter";
counterContainer.appendChild(counterAmt);
buttonContainer.appendChild(counterInc);
buttonContainer.appendChild(counterDec);
counterContainer.appendChild(buttonContainer);

function setCounterAmt(amt) {
  counterContainer.setAttribute("aria-label",`Counter is at ${amt}`);
  counterAmt.innerText = counterContainer.getAttribute("aria-label");
}

function incrementCounter(){
  setCounterAmt(Number(counterContainer.getAttribute("aria-label").match(/-{0,1}\d+/)) + 1);
  counterInc.focus()
}
function decrementCounter(){
  setCounterAmt(Number(counterContainer.getAttribute("aria-label").match(/-{0,1}\d+/)) - 1);
  counterDec.focus()
}

setCounterAmt(0);

counterContainer.addEventListener("keydown",(e)=>{
  const {key} = e;
  if (key == "ArrowUp") incrementCounter();
  else if (key == "ArrowDown") decrementCounter();
})

counterContainer.addEventListener("focusin",()=>{
  counterAmt.setAttribute("aria-live","assertive");
})
counterContainer.addEventListener("focusout",()=>{
  counterAmt.setAttribute("aria-live","polite");
})
counterInc.addEventListener("click",incrementCounter);
counterDec.addEventListener("click",decrementCounter);

const appendElementToDOM = (element) => {
  element.tabIndex = Number(element.tabIndex) >= 0 ? element.tabIndex : -1;
  setTimeout(()=>element.classList.add("focusable"),0);
  return async (el) => {
    try {

    } catch (error) {

    } finally {
      return new Promise((resolve,_)=>{
        setTimeout(()=>{
          element.id = el.closest("[data-module-id]").dataset.moduleId;
          el.appendChild(element);
          resolve(el);
        },0)
      })
    }
  }
}
export default appendElementToDOM(counterContainer);
