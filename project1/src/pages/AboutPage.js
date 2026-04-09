import { BaseComponent } from '../core/BaseComponent.js';

export class AboutPage extends BaseComponent {
  render() {
    const container = document.createElement('div');

    container.style.minHeight = '100vh';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '20px';
    container.style.textAlign = 'center';

    const title = document.createElement('h1');
    title.textContent = 'MiniReduxApp';

    const text = document.createElement('p'); 
    text.textContent = 'The Company.';

    const mainBtn = document.createElement('button');
    mainBtn.textContent = 'Go Back';

    mainBtn.onclick = () => {
      location.hash = '/';
    };

    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(mainBtn);

    return container;
  }
}