const counter = document.createElement("div");
counter.setAttribute("aria-label","Counter is at 0");
counter.style = "display:flex;align-items:center;";
const buttonContainer = document.createElement("div");
buttonContainer.style = "display:flex;flex-direction:column";
const counterAmt = document.createElement("span");
counterAmt.setAttribute("aria-live","polite");
const counterInc = document.createElement("button");
counterInc.innerText = "Increment Counter";
const counterDec = document.createElement("button");
counterDec.innerText = "Decrement Counter";
counter.appendChild(counterAmt);
buttonContainer.appendChild(counterInc);
buttonContainer.appendChild(counterDec);
counter.appendChild(buttonContainer);

function setCounterAmt(amt) {
  counter.setAttribute("aria-label",`Counter is at ${amt}`);
  counterAmt.innerText = counter.getAttribute("aria-label");
}

function incrementCounter(){
  setCounterAmt(Number(counter.getAttribute("aria-label").match(/-{0,1}\d+/)) + 1);
  counterInc.focus()
}
function decrementCounter(){
  setCounterAmt(Number(counter.getAttribute("aria-label").match(/-{0,1}\d+/)) - 1);
  counterDec.focus()
}

setCounterAmt(0);

counter.addEventListener("keydown",(e)=>{
  const {key} = e;
  if (key == "ArrowUp") incrementCounter();
  else if (key == "ArrowDown") decrementCounter();
})

counter.addEventListener("focusin",()=>{
  counterAmt.setAttribute("aria-live","assertive");
})
counter.addEventListener("focusout",()=>{
  counterAmt.setAttribute("aria-live","polite");
})
counterInc.addEventListener("click",incrementCounter);
counterDec.addEventListener("click",decrementCounter);

export default counter;
