function convertCtoF(c=0) {return c * (9/5) + 32}
function convertFtoC(f=0) {return (f - 32) * (5/9)}
function restrictDecimal(n=0) {
  return /\.\d+/.test(n.toString()) ? n.toFixed(1) : n
}
function handleChangeEvent(value=NaN,type="") {
  let v = Number(value), temp, tType;
  if (v !== v) v = 0;
  if (!type) throw new Error("Must specify type");
  if (type == "celsius") {
    temp = convertCtoF(v); tType = "fahrenheit";
    generateARIAPhrase(value,temp,"celsius");
  }
  else if (type == "fahrenheit") {
    temp = convertFtoC(v); tType = "celsius";
    generateARIAPhrase(temp,value,"fahrenheit");
  }
  document.querySelector(`#${tType}`).value = restrictDecimal(temp);
}

function changeListener(e) {
  let {target:{value,id:type}} = e;
  handleChangeEvent(value,type);
}

const tempConverter = document.createElement("div");
const tempCLabel = document.createElement("label");
const tempFLabel = document.createElement("label");
const tempC = document.createElement("input");
const tempF = document.createElement("input");

function generateARIAPhrase(cel,fah,changed = "celsius") {
  const 
    c = `${restrictDecimal(cel)} degrees Celsius`, 
    f = `${restrictDecimal(fah)} degrees Fahrenheit`, 
    phrase = changed == "celsius" ? 
      `${c} is equivalent to ${f}` :  
      `${f} is equivalent to ${c}.`; 

  tempConverter.setAttribute("aria-label", phrase);
}

tempConverter.setAttribute("aria-label", `Temperature converter. Input a temperature in either Celsius or Fahrenheit to get the conversion.`)
tempConverter.setAttribute("aria-live", "assertive");

tempCLabel.innerText = "Celsius"; 
tempFLabel.innerText = "Fahrenheit"; 

tempC.id = "celsius";
tempC.setAttribute("type", "number");
tempC.setAttribute("value", "0");
tempC.addEventListener("input",changeListener,false);
tempF.id = "fahrenheit";
tempF.setAttribute("type", "number");
tempF.setAttribute("value", convertCtoF(Number(tempC.value)));
tempF.addEventListener("input",changeListener,false);

tempCLabel.appendChild(tempC);
tempFLabel.appendChild(tempF);
tempConverter.appendChild(tempCLabel);
tempConverter.appendChild(tempFLabel);

export default tempConverter;
