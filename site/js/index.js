function qS(rootDomEl,x){return rootDomEl?.querySelector(x)};
function qSA(rootDomEl,x){return rootDomEl?.querySelectorAll(x)};
let moduleLoader;
async function initialiazeModuleLoader() {
  moduleLoader = await import("/js/modules/index.js").then(({default:module})=>module);
  return moduleLoader;
}
initialiazeModuleLoader()

async function loadModule(mod,eventType=null) {
  if (!mod.dataset.module) return;
  if (mod.dataset.opened == "false") {
    let moduleContainer, dataToRender;
    mod.dataset.opened = true;
    moduleContainer = mod.querySelector(".module-container");
    if (typeof moduleLoader != "function") {
      moduleLoader = await initialiazeModuleLoader();
    }
    console.log(`Loading ${mod.dataset.module}`);
    const module = await moduleLoader(mod.dataset.module);
    if (!module) return;
    dataToRender = await new Promise(async (resolve,reject) => {
      const content = await module(qS(moduleContainer,".module"));
      if (content) {
        moduleContainer.dataset.loaded = true;
        console.log(`${mod.dataset.module} mounted:`,mod);
        resolve(true);
      }
      else reject(false);
    });
    setTimeout(()=>qS(mod,".focusable").focus(),0)
    return dataToRender;
  }
  else if (!mod.open && eventType == "click" && mod.dataset.opened == "true") {
    setTimeout(()=>qS(mod,".focusable").focus(),0)
  }
}

const modules = qSA(document,"[data-module]");
console.log({modules});
modules.forEach(function loadModuleEventListeners(mod) {
  // Try to preload content if mouse is hovering for sustained period
  mod.addEventListener("mouseover",function mouseOverLoad() {
    let timeout;
    if (mod.dataset.opened == "false") {
      timeout = setTimeout(function hoverEvent() {
        loadModule(mod);
      },1500);
      // do not load if user is just scrolling by
      mod.addEventListener("mouseout",()=>{if (timeout !== undefined) clearTimeout(timeout);});
    }
  });
  mod.addEventListener("click",function clickEvent(e){loadModule(mod,e.type);});
  if (mod.open) setTimeout(()=>loadModule(mod),1000)
})
