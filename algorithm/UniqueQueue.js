import { isPrimitive } from '../utils/isPrimitive'

class UniqueQueue {
    constructor(init) {
        this.added = new Set();
        this.queue = [];
        this.index = 0;
        for (const [item, memo] of init) {
            this.enqueue(item, memo);
        }
    }

    get length() {
        return this.queue.length - this.index;
    }

    dequeue() {
        if (this.length <= 0) {
            throw new Error('Queue is empty');
        }
        return this.queue[this.index++];
    }

    enqueue(item, memo) {
        if (this.added.has(item)) return;
        if (!isPrimitive(item)) {
            this.added.add(item);
        }
        this.queue.push([item, memo]);
    }

    free() {
        this.queue = this.queue.slice(this.index);
        this.index = 0;
    }
}
