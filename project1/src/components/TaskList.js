import { BaseComponent } from '../core/BaseComponent.js';
import { createComponent } from '../core/createComponent.js';
import { TaskItem } from './TaskItem.js';

export class TaskList extends BaseComponent {
  render() {
    const container = document.createElement('div');

    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';

    const tasks = this.props.tasks || [];

    if (tasks.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = 'NOthing';
      container.appendChild(empty);
      return container;
    }

    tasks.forEach(task => {
      const item = createComponent(TaskItem, {
        task,
        onDelete: this.props.onDelete
      });

      container.appendChild(item.el);
    });

    return container;
  }
}