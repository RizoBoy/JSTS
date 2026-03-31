function Reduce(array, func, init) {
    if (!Array.isArray(array))
        throw new TypeError("No Array found"); // Проверка на массив

    if (array.length === 0)
        throw new TypeError("Array is empty"); // Проверки на пустоту массива

    if (typeof func !== "function")
        throw new TypeError("No Function found"); // Проверка функции

    let acc = (init === undefined) ? array[0] : init; // Если нету init, то берём первый элемент из массива
    let index = (init === undefined) ? 1 : 0; // Если нету init, и мы уже взяли первый элмент из массива, то следующий индекс должен быть +1

    for (let i = index; i < array.length; i++) // Проходимся по каждому элементу
        if (i in array) // Проверяем массив на дырки
            acc = func(acc, array[i], i, array); // Выполняем функцию и передаём данные (аккумулятор, текущее значение, индекс, массив)

    return acc;
}

function sum(acc, cur) {
    return acc + cur;
}

describe("reducer", () => {
  test("sum 1", () => { expect(Reduce([1, 2, 3, 4], sum)).toBe(10); });
  test("sum 2", () => { expect(Reduce([1, 2, 3, 4], sum, 3)).toBe(13); });
  test("sum 3", () => { expect(Reduce([1, 2, 3, 4, 5], (acc, cur) => { return acc + cur; } )).toBe(15); });
  test("sum 4", () => { expect(Reduce([5], sum, 3)).toBe(8); });
  test("sum 5", () => { expect(Reduce([1, , 5], sum)).toBe(6); });

  test("error 1", () => { expect(() => Reduce(123, sum)).toThrow("No Array found"); });
  test("error 2", () => { expect(() => Reduce([], sum)).toThrow("Array is empty"); });
  test("error 3", () => { expect(() => Reduce([1, 2, 3], null)).toThrow("No Function found"); });
});