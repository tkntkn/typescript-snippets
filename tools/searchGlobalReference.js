import { isPrimitive } from '../utils/isPrimitive';
import { BFS } from '../algorithm/BFS';

function safe(danger) {
    try {
        return danger()
    } catch (error) {
        console.error(error);
    }
}

function getAllKeys(value) {
    const keys = [];
    while (value) {
        keys.push(...Object.keys(value));
        value = Object.getPrototypeOf(value);
    }
    return keys;
}

function getGetKeysForSearch() {
    const ignoreKeys = ['prototype', 'innerText', 'innerHTML', 'outerText', 'outerHTML', 'textContent'];
    return (value) => {
        if (isPrimitive(value)) {
            return [];
        }
        return getAllKeys(value).filter(key => !ignoreKeys.includes(key));
    }
}

function searchGlobalReference(strict, keyword, root, progressSize) {
    const isTarget = node => typeof(node) === 'string' && (strict ? node === keyword : node.includes(keyword));
    const getKeysForSearch = getGetKeysForSearch();
    const getChildren = function *(node, keys) {
        for (const key of getKeysForSearch(node)) {
            const child = safe(() => node[key]);
            if (child instanceof Node) {
                continue;
            }
            yield [child, [...keys, key]];
        }
    }
    return BFS([root, []], isTarget, getChildren, progressSize);
}

function keysToValue(rootName, keys) {
    return rootName + keys.map(key => {
        if (key.match(/^[_a-zA-Z][_a-zA-Z0-9]*$/)) {
            return `.${key}`;
        }
        if (key.match(/^(0|[1-9][0-9]*)$/)) {
            return `[${key}]`;
        }
        return `["${key}"]`
    }).join("");
}


var result = searchGlobalReference(false, 'キーワード', window);
console.log(result.map(i => keysToValue('window', i[1])).join("\n"));

