class MessageQueue {
  constructor(queue = [], options) {
    const {
      cacheUsedQueue = false,
      consumerFun = () => {}
    } = options || {};
    this.queue = queue;
    this.usedQueue = [];
    this.cacheUsedQueue = cacheUsedQueue;
    this.consumerFun = consumerFun;
  }

  push(message) {
    const isEmpty = this.queue.length ? false : true;
    if (Array.isArray(message)) {
      this.queue.push(...message);
    } else {
      this.queue.push(message);
    }
    isEmpty && this.consumerFun();
  }

  shift() {
    if (this.cacheUsedQueue && this.queue.length) {
      this.usedQueue.push(this.queue[0]);
    }
    return this.queue.shift();
  }

  shiftAll() {
    if (this.cacheUsedQueue && this.queue.length) {
      this.usedQueue.push(...this.queue);
    }
    const allQueue = [...this.queue];
    this.queue = [];
    return allQueue;
  }

  clearQueue() {
    this.queue = [];
  }

  clearUsedQueue() {
    this.usedQueue = [];
  }

  clear() {
    this.queue = [];
    this.usedQueue = [];
  }
}
