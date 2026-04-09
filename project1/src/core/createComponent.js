export function createComponent(Component, props = {}, ...children) {
  const instance = new Component({ ...props, children });
  const el = instance.render();

  if (!(el instanceof HTMLElement)) {
    throw new Error('Component must return a DOM element');
  }

  instance.el = el;

  if (children.length) {
    children.flat().forEach(child => {
      if (child instanceof HTMLElement) {
        el.appendChild(child);
      } else if (typeof child === 'string' || typeof child === 'number') {
        el.appendChild(document.createTextNode(child));
      }
    });
  }

  return instance;
}