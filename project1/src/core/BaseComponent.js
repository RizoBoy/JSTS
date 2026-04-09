export class BaseComponent {
  constructor(props = {}) {
    this.props = props;
    this.el = null;
  }

  render() {
    return document.createElement('div');
  }

  mount(container) {
    this.el = this.render();

    if (!(this.el instanceof HTMLElement)) {
      throw new Error('render() must return a DOM element');
    }

    container.appendChild(this.el);
    this.onMount();
  }

  unmount() {
    if (this.el && this.el.parentNode) {
      this.onUnmount();
      this.el.parentNode.removeChild(this.el);
      this.el = null;
    }
  }

  update(newProps = {}) {
    this.props = { ...this.props, ...newProps };

    if (!this.el) return;

    const newEl = this.render();
    this.el.replaceWith(newEl);
    this.el = newEl;

    this.onUpdate();
  }

  onMount() {}
  onUnmount() {}
  onUpdate() {}
}