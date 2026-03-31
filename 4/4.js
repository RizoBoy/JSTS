function QuerySelectorAll(selectors) {
    const results = [];
    const selectorParts = selectors.split(' '); // делим селекторы по пробелам

    function find(node, selector) {
        if (node.nodeType !== 1) // Проверяем тип ноды на элементы
            return;

        if ((selector.startsWith('.') && node.classList.contains(selector.slice(1))) || // ищем по классам
            (selector.startsWith('#') && node.id === selector.slice(1)) || // ищем по id
            node.tagName.toLowerCase() === selector.toLowerCase()) // ищем по тегам
            results.push(node);

        node.childNodes.forEach(child => find(child, selector)); // внутри каждой ноды ищем еще ноды, если есть
    }

    for (let i = 0; i < selectorParts.length; i++) // по каждому селектору проходимся в документе
        find(document.body, selectorParts[i]);

    return results;
}

// Тесты
console.log('div:', QuerySelectorAll('div').length);
console.log('.box:', QuerySelectorAll('.box').length);
console.log('.active:', QuerySelectorAll('.active').length);
console.log('#header:', QuerySelectorAll('#header').length);
console.log('p:', QuerySelectorAll('p').length);