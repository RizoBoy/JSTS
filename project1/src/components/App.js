import { BaseComponent } from '../core/BaseComponent.js';
import { createComponent } from '../core/createComponent.js';
import { TaskList } from './TaskList.js';
import { TaskForm } from './TaskForm.js';

export class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    if (document.getElementById('app-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'app-styles';
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
      }
      
      button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.3s ease;
      }
      
      input {
        font-family: inherit;
        outline: none;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    document.title = 'Task Manager';

    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/svg+xml';
      document.head.appendChild(icon);
    }
    icon.href = '/favicon.svg';

    const root = document.createElement('div');
    
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.gap = '24px';
    root.style.padding = '40px 20px';
    root.style.maxWidth = '700px';
    root.style.margin = '0 auto';
    root.style.minHeight = '100vh';

    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      color: white;
      margin-bottom: 10px;
    `;

    const title = document.createElement('h1');
    title.textContent = '✓ Task Manager';
    title.style.cssText = `
      font-size: 2.5rem;
      margin-bottom: 8px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Mini Super Redux App';
    subtitle.style.cssText = `
      font-size: 1rem;
      opacity: 0.95;
      font-weight: 300;
    `;

    header.appendChild(title);
    header.appendChild(subtitle);

    const contentCard = document.createElement('div');
    contentCard.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      backdrop-filter: blur(10px);
    `;

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

    contentCard.appendChild(form.el);
    contentCard.appendChild(list.el);

    const footer = document.createElement('div');
    footer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 12px;
    `;

    const aboutBtn = document.createElement('button');
    aboutBtn.textContent = 'About';
    aboutBtn.style.cssText = `
      padding: 12px 28px;
      background: rgba(255,255,255,0.2);
      color: white;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      border: 2px solid rgba(255,255,255,0.3);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    `;

    aboutBtn.onmouseover = () => {
      aboutBtn.style.background = 'rgba(255,255,255,0.3)';
      aboutBtn.style.transform = 'translateY(-2px)';
    };
    aboutBtn.onmouseout = () => {
      aboutBtn.style.background = 'rgba(255,255,255,0.2)';
      aboutBtn.style.transform = 'translateY(0)';
    };

    aboutBtn.onclick = () => {
      this.props.router.navigate('/about');
    };

    footer.appendChild(aboutBtn);

    root.appendChild(header);
    root.appendChild(contentCard);
    root.appendChild(footer);

    return root;
  }
}