function renderHTMLElement({elementType="",props={},attrs={},eventListeners=[],children=[]}) {
  if (!elementType) throw new Error("Element type required");
  let element;
  try {
    element = document.createElement(elementType);
    for (let prop in props) {
      let p = props[prop];
      element[prop] = p;
    }
    for (let attr in attrs) {
      let a = attrs[attr];
      element.setAttribute(attr, a);
    }
    for (let listener in eventListeners) {
      let [eventType,eventCallback] = eventListeners[listener];
      element.addEventListener(eventType,eventCallback);
    }
    if (Array.isArray(children) && children.length) {
      for (let child in children) {
        let c = children[child];
        if (c instanceof HtmEl) element.appendChild(c.render());
        else {
          let html = "";
          if (typeof c == "object") {
            html = `${element.innerHTML}\n${JSON.stringify(c,null,2)}`.trim() + "\n";
          }
          else html = `${element.innerHTML}`.trim()+` ${c}`;
          element.innerHTML = html.trim();
        }
      }
    }
    else if (children instanceof HtmEl) element.appendChild(children.render());
    else if (typeof children == "object" && (!Array.isArray(children) || !children == null)) {
      element.innerHTML = `${element.innerHTML} ${JSON.stringify(children,null,2)+"\n"}`.trim();
    }
    else if (typeof children !== "object") {
      element.innerHTML = `${element.innerHTML}`.trim()+` ${children}`;
    }
  } catch (err) {
    console.error(err)
  } finally {
    return element;
  } 
}

class HtmEl {
  constructor({elementType="div",props={},attrs={},eventListeners=[],children=[]}) {
    this.elementType = elementType;
    this.props = props;
    this.attrs = attrs;
    this.eventListeners = eventListeners;
    this.children = children;
  }
  render() {
    return renderHTMLElement({
      elementType: this.elementType,
      props: this.props,
      attrs: this.attrs,
      eventListeners: this.eventListeners,
      children: this.children
    })
  }
}

export default new HtmEl(
{
  elementType:"div",
  props: {},
  attrs: {},
  eventListeners: [],
  children: [
    new HtmEl({elementType:"p",props:{innerText:"Flight Booker"}}),
    new HtmEl({elementType:"p",props:{innerHTML:'This element is being created from a javascript module <span title="It was created using a custom class HtmEl and its render() method"><em>programatically</em>'}}),
  ]
}).render()
