import { UniqueQueue } from './UniqueQueue';
import { isPrimitive } from './utils/isPrimitive';

const getCopyBase = item => Array.isArray(item) ? [] : {};

function removeCircular(root) {
    const rootCopy = getCopyBase(root);
    const queue = new UniqueQueue([[root, rootCopy]]);
    while (queue.length > 0) {
        const [node, copy] = queue.dequeue();
        for (const key of Object.keys(node)) {
            if (isPrimitive(node[key])) {
                copy[key] = node[key];
            } else {
                copy[key] = getCopyBase(node[key]);
                queue.enqueue(node[key], copy[key]);
            }
        }
    }
    return rootCopy;
}
