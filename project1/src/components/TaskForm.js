import { BaseComponent } from '../core/BaseComponent.js';

export class TaskForm extends BaseComponent {
  render() {
    const form = document.createElement('form');

    form.style.cssText = `
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add a new task...';
    input.style.cssText = `
      flex: 1;
      padding: 14px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f9f9f9;
    `;

    input.onfocus = () => {
      input.style.borderColor = '#667eea';
      input.style.background = '#fff';
      input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    };

    input.onblur = () => {
      input.style.borderColor = '#e0e0e0';
      input.style.background = '#f9f9f9';
      input.style.boxShadow = 'none';
    };

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = '+ Add';
    button.style.cssText = `
      padding: 14px 28px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

    button.onmouseover = () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    };

    button.onmouseout = () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    };

    button.onmousedown = () => {
      button.style.transform = 'translateY(0px)';
    };

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const value = input.value.trim();
      if (!value) return;

      this.props.onAdd({
        id: Date.now(),
        title: value
      });

      input.value = '';
      input.focus();
    });

    return form;
  }
}