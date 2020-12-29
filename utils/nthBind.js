function nthBind(func, index, value) {
    return function(...args) {
        const realArgs = [...args.slice(0, index), value, ...args.slice(index)];
        return func(...realArgs);
    }
}
