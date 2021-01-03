interface Remote {
  execute<P extends Serializable, R>(params: P, process: (params: P) => R): Promise<R>
}

async function main() {
  const remote = getRemote();
  const second = getUserInput<number>();

  const until = +new Date() + second * 1_000;
  const count = await remote.execute({ until }, ({ until }) => {
    let count = 0;
    while (+new Date() <= until) count++;
    return count;
  });

  console.log(count);
}

declare function getUserInput<T>(): T;
declare function getRemote(): Remote;
declare type Serializable = any;
