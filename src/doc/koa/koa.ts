const http = require('http');
const Emitter = require('events');
import compose from './compose';

class Koa extends Emitter {
  _context: Object;
  _middleware: Array<Function>;
  constructor() {
    super();
    this._context = {};
    this._middleware = [];
  }

  listen(...args: Array<any>) {
    const server = http.createServer(this.run);
    return server.listen(...args);
  }

  use(middleware: Function) {
    this._middleware.push(middleware);
  }

  run(req: any, res: any) {
    const context = this.createContext(req, res);
    compose(this._middleware, context).catch(err => {
      this.onerror(err);
    });
  }

  createContext(req: any, res: any) {
    const context = Object.create(this._context);
    context.req = req;
    context.res = res;
    return context;
  }

  onerror(err: Error) {
    console.log(err);
  }
}

export default Koa;
