import { BaseComponent } from '../core/BaseComponent.js';
import { createComponent } from '../core/createComponent.js';
import { App } from '../components/App.js';

export class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    const container = document.createElement('div');

    container.style.minHeight = '100vh';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    const app = createComponent(App, {
      store: this.store,
      router: this.props.router
    });

    container.appendChild(app.el);

    return container;
  }
}