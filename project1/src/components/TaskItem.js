import { BaseComponent } from '../core/BaseComponent.js';

export class TaskItem extends BaseComponent {
  render() {
    const container = document.createElement('div');

    container.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 10px;
      border-left: 4px solid #667eea;
      transition: all 0.3s ease;
    `;

    container.onmouseover = () => {
      container.style.background = '#f0f1f7';
      container.style.transform = 'translateX(4px)';
      container.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.1)';
    };

    container.onmouseout = () => {
      container.style.background = '#f8f9fa';
      container.style.transform = 'translateX(0)';
      container.style.boxShadow = 'none';
    };

    const title = document.createElement('span');
    title.textContent = this.props.task.title;
    title.style.cssText = `
      flex: 1;
      font-size: 1rem;
      color: #2d3748;
      font-weight: 500;
    `;

    const button = document.createElement('button');
    button.textContent = '✕';
    button.style.cssText = `
      padding: 6px 12px;
      background: #ff6b6b;
      color: white;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    `;

    button.onmouseover = () => {
      button.style.background = '#ff5252';
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
    };

    button.onmouseout = () => {
      button.style.background = '#ff6b6b';
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
    };

    button.onmousedown = () => {
      button.style.transform = 'scale(0.95)';
    };

    button.onclick = () => {
      this.props.onDelete(this.props.task.id);
    };

    container.appendChild(title);
    container.appendChild(button);

    return container;
  }
}