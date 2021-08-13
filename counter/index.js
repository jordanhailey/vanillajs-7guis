const counter = async (el) => {
  const element = document.createElement("div");
  try {

  } catch (error) {

  } finally {
    return new Promise((resolve,_)=>{
      setTimeout(()=>{
        element.innerText = el.closest("[id]").id;
        el.appendChild(element);
        resolve(el);
      },1500)
    })
  }
}

export default counter;
