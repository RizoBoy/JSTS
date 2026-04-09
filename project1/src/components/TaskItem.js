import { BaseComponent } from '../core/BaseComponent.js';

export class TaskItem extends BaseComponent {
  render() {
    const container = document.createElement('div');

    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'center';
    container.style.padding = '10px';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '6px';

    const title = document.createElement('span');
    title.textContent = this.props.task.title;

    const button = document.createElement('button');
    button.textContent = 'X';
    button.style.cursor = 'pointer';

    button.onclick = () => {
      this.props.onDelete(this.props.task.id);
    };

    container.appendChild(title);
    container.appendChild(button);

    return container;
  }
}