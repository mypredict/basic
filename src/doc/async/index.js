function compose(middlewares, context) {
  let middlewareIndex = 0;

  function dispatch() {
    if (middlewareIndex >= middlewares.length) {
      return Promise.resolve();
    }

    const currentMiddleware = middlewares[middlewareIndex];
    middlewareIndex++;
    return Promise.resolve(
      currentMiddleware(context, () => {
        return dispatch();
      })
    );
  }
  return dispatch();
}

async function a(ctx, next) {
  ctx.a = 'a';
  console.log(1);
  await next();
  console.log(2);
  console.log(ctx)
}

async function b(ctx, next) {
  ctx.b = 'b'
  console.log(3);
  next();
  console.log(4);
}

async function c(ctx, next) {
  ctx.c = 'c'
  console.log(5);
  await next();
  console.log(6);
}

const arr = [a, b, c];

compose(arr, {});
// compose(arr, {});