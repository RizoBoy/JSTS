import { BaseComponent } from '../core/BaseComponent.js';

export class TaskForm extends BaseComponent {
  render() {
    const form = document.createElement('form');

    form.style.display = 'flex';
    form.style.gap = '10px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter...';
    input.style.flex = '1';
    input.style.padding = '10px';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'ADD';
    button.style.padding = '10px';

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
    });

    return form;
  }
}