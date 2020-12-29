import { UniqueQueue } from './UniqueQueue'

class Timer {
    constructor() {
        this.start = +new Date();
    }

    time() {
        const passed = +new Date() - this.start;
        const sec = Math.floor(passed / 1000).toString().padStart(3, " ");
        const msec = (passed % 1000).toString().padStart(4, "0");
        return `${sec}.${msec}`;
    }
}

export function BFS([root, rootRef], isTarget, getChildren, progressSize) {
    const timer = new Timer();
    const queue = new UniqueQueue([[root, rootRef]]);
    const match = [];
    while (queue.length > 0) {
        const [node, ref] = queue.dequeue();
        if (isTarget(node)) {
            match.push([node, ref]);
        }
        for (const [child, childRef] of getChildren(node, ref)) {
            queue.enqueue(child, childRef);
        }
        if (progressSize && progressSize <= queue.index) {
            console.log(`[${timer.time()}] Checked +${queue.index} nodes. Matched ${match.length} items. ${queue.length} nodes in queue.`);
            queue.free();
        }
    }
    return match;
}
