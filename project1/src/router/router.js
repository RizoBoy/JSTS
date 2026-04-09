export class Router {
  constructor(routes, options = {}, rootId = 'app') {
    this.routes = routes;
    this.options = options;
    this.root = document.getElementById(rootId);
    this.currentPage = null;

    window.addEventListener('hashchange', () => this.render());
  }

  getPath() {
    return location.hash.slice(1) || '/';
  }

  render() {
    const path = this.getPath();
    const Page = this.routes[path];

    if (!Page) return;

    if (this.currentPage) {
      this.currentPage.unmount();
    }

    this.root.innerHTML = '';

    this.currentPage = new Page(this.options);
    this.currentPage.mount(this.root);
  }

  init() {
    this.render();
  }
}