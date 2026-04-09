import { BaseComponent } from '../core/BaseComponent.js';
import { createComponent } from '../core/createComponent.js';
import { TaskItem } from './TaskItem.js';

export class TaskList extends BaseComponent {
  render() {
    const container = document.createElement('div');

    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    const tasks = this.props.tasks || [];

    if (tasks.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = '📝 No tasks yet';
      empty.style.cssText = `
        text-align: center;
        padding: 48px 24px;
        color: #999;
        font-size: 1.1rem;
        font-weight: 500;
      `;
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