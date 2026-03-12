require("./2");

function greet(greeting, punctuation) {
  return greeting + " " + this.name + punctuation;
}

describe("myCall", () => {
  test("1", () => {
    const obj = { name: "JavaScript" };
    expect(greet.myCall(obj, "Hello", "!")).toBe("Hello JavaScript!");
  });

  test("2", () => {
    const obj = { name: "TypeScuipt" };
    expect(greet.myCall(obj, "Hi", ".")).toBe("Hi TypeScuipt.");
  });

  test("3", () => {
    globalThis.name = "Kazakhstan";
    expect(greet.myCall(null, "Hey", "!")).toBe("Hey Kazakhstan!");
  });
});

describe("myApply", () => {
  test("1", () => {
    const obj = { name: "bob" };
    expect(greet.myApply(obj, ["Hello", "!"])).toBe("Hello bob!");
  });

  test("2", () => {
    const obj = { name: "max" };
    expect(greet.myApply(obj, ["Hi", "."])).toBe("Hi max.");
  });

  test("3", () => {
    function test() {
      return this.value;
    }

    const obj = { value: 10 };
    expect(test.myApply(obj)).toBe(10);
  });
});

describe("myBind", () => {
  test("1", () => {
    const obj = { name: "test1" };
    const bound = greet.myBind(obj);

    expect(bound("Hello", "!")).toBe("Hello test1!");
  });

  test("2", () => {
    const obj = { name: "test2" };
    const bound = greet.myBind(obj, "Hello");

    expect(bound("!")).toBe("Hello test2!");
  });

  test("3", () => {
    const obj = { name: "test3" };
    const bound = greet.myBind(obj, "Hi", ".");

    expect(bound()).toBe("Hi test3.");
  });
});