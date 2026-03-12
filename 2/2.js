Function.prototype.myCall = function (context) {
  if (!context) {
    context = globalThis;
  }

  context.tempFunction = this;
  const args = [];

  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return context.tempFunction(...args);
};

Function.prototype.myApply = function (context, args) {
  if (!context) {
    context = globalThis;
  }

  context.tempFunction = this;

  let result;

  if (args) {
    result = context.tempFunction(...args);
  } else {
    result = context.tempFunction();
  }

  return result;
};

Function.prototype.myBind = function (context) {
  const fn = this;

  const bindArgs = [];
  for (let i = 1; i < arguments.length; i++) {
    bindArgs.push(arguments[i]);
  }

  return function () {

    const callArgs = [];
    for (let i = 0; i < arguments.length; i++) {
      callArgs.push(arguments[i]);
    }

    const allArgs = bindArgs.concat(callArgs);

    return fn.myApply(context, allArgs);
  };
};