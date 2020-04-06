const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class BsPromise {
  constructor(executor) {
    this._status = PENDING;
    this._value = undefined;
    this._resolveQueue = [];
    this._rejectQueue = [];

    const _resolve = val => {
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = val;

        while (this._resolveQueue.length) {
          this._resolveQueue.shift()(val);
        }
      };
      setTimeout(run);
    };

    const _reject = val => {
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = val;
        while (this._rejectQueue.length) {
          this._rejectQueue.shift()(val);
        }
      };
      setTimeout(run);
    };

    executor(_resolve, _reject);
  }

  then(resolveFn, rejectFn) {
    if (typeof resolveFn !== 'function') {
      resolveFn = val => val;
    }
    if (typeof rejectFn !== 'function') {
      rejectFn = val => {
        throw new Error(val instanceof Error ? val.message : val);
      };
    }

    return new BsPromise((resolve, reject) => {
      const fulfilledFn = val => {
        try {
          const result = resolveFn(val);
          if (result instanceof BsPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      const rejectedFn = val => {
        try {
          const result = rejectFn(val);
          if (result instanceof BsPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      switch (this._status) {
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          fulfilledFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    });
  }

  catch (rejectFn) {
    return this.then(undefined, rejectFn);
  } finally(callback) {
    return this.then(
      val => BsPromise.resolve(callback()).then(() => val),
      val =>
      BsPromise.resolve(callback()).then(() => {
        throw val;
      })
    );
  }

  static resolve(val) {
    if (val instanceof BsPromise) {
      return val;
    }
    return new BsPromise(resolve => resolve(val));
  }

  static reject(val) {
    return new BsPromise((_, reject) => reject(val));
  }

  static all(promiseArr) {
    return new BsPromise((resolve, reject) => {
      let completed = 0;
      const result = [];
      promiseArr.forEach((promiseItem, index) => {
        BsPromise.resolve(promiseItem).then(
          val => {
            completed++;
            result[index] = val;
            if (completed === promiseArr.length) {
              resolve(result);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    });
  }

  static race(promiseArr) {
    return new BsPromise((resolve, reject) => {
      for (let promiseItem of promiseArr) {
        promiseArr.resolve(promiseItem).then(
          val => {
            resolve(val);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }

  static any(promiseArr) {
    return new BsPromise((resolve, reject) => {
      promiseArr.forEach(promiseItem => {
        if (promiseItem) {
          resolve();
        }
        reject();
      });
    });
  }
}