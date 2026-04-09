import { BaseComponent } from '../core/BaseComponent.js';
import { createComponent } from '../core/createComponent.js';
import { TaskList } from './TaskList.js';
import { TaskForm } from './TaskForm.js';

export class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    const root = document.createElement('div');
    
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.gap = '16px';
    root.style.padding = '20px';
    root.style.maxWidth = '600px';
    root.style.margin = '0 auto';

    const title = document.createElement('h1');
    title.textContent = 'MiniReduxApp';

    const form = createComponent(TaskForm, {
      onAdd: (task) => {
        this.store.dispatch({
          type: 'ADD_TASK',
          payload: task
        });
      }
    });

    const list = createComponent(TaskList, {
      tasks: this.store.getState().tasks.tasks,
      onDelete: (id) => {
        this.store.dispatch({
          type: 'REMOVE_TASK',
          payload: id
        });
      }
    });

    const aboutBtn = document.createElement('button');
    aboutBtn.textContent = 'About';

    aboutBtn.onclick = () => {
      location.hash = '/about';
    };

    root.appendChild(title);
    root.appendChild(form.el);
    root.appendChild(list.el);
    root.appendChild(aboutBtn);

    return root;
  }
}