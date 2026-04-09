export class Router {
  constructor(routes, options = {}, rootId = 'app') {
    this.routes = routes;
    this.options = { ...options, router: this };
    this.root = document.getElementById(rootId);
    this.currentPage = null;

    window.addEventListener('popstate', () => this.render());
  }

  getPath() {
    return location.pathname || '/';
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.render();
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