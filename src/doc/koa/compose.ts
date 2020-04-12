interface Context {
  req: any;
  res: any;
}

function compose(middlewares: Array<Function>, context: Context) {
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

export default compose;
