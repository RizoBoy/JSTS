import { BaseComponent } from '../core/BaseComponent.js';

export class AboutPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    if (document.getElementById('about-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'about-styles';
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
    `;
    document.head.appendChild(style);
  }

  render() {
    const container = document.createElement('div');

    container.style.cssText = `
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 48px 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 600px;
      text-align: center;
    `;

    const title = document.createElement('h1');
    title.textContent = '📋 About Task Manager';
    title.style.cssText = `
      font-size: 2.2rem;
      color: #2d3748;
      margin-bottom: 20px;
      font-weight: 700;
    `;

    const description = document.createElement('p');
    description.textContent = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.';
    description.style.cssText = `
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 16px;
      line-height: 1.6;
      font-weight: 400;
    `;

    const features = document.createElement('div');
    features.style.cssText = `
      background: #f8f9fa;
      border-radius: 10px;
      padding: 24px;
      margin: 24px 0;
      text-align: left;
    `;

    const featuresTitle = document.createElement('h3');
    featuresTitle.textContent = '✨ Features';
    featuresTitle.style.cssText = `
      color: #667eea;
      margin-bottom: 12px;
      font-size: 1.2rem;
    `;

    const featuresList = document.createElement('ul');
    featuresList.style.cssText = `
      list-style: none;
      color: #555;
      line-height: 2;
    `;

    const features_data = [
      '🐵 Monke',
      '🐘 Elepha',
      '😺 Catt',
      '🐶 Doge',
      '🐯 Tiga'
    ];

    features_data.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = '• ' + feature;
      li.style.cssText = `
        color: #666;
        font-size: 1rem;
      `;
      featuresList.appendChild(li);
    });

    features.appendChild(featuresTitle);
    features.appendChild(featuresList);

    const backBtn = document.createElement('button');
    backBtn.textContent = '← Back to Tasks';
    backBtn.style.cssText = `
      padding: 14px 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

    backBtn.onmouseover = () => {
      backBtn.style.transform = 'translateY(-2px)';
      backBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    };

    backBtn.onmouseout = () => {
      backBtn.style.transform = 'translateY(0)';
      backBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    };

    backBtn.onmousedown = () => {
      backBtn.style.transform = 'translateY(0px)';
    };

    backBtn.onclick = () => {
      this.props.router.navigate('/');
    };

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(features);
    card.appendChild(backBtn);

    container.appendChild(card);

    return container;
  }
}