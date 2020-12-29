// TypeScriptのバグを回避: setTimeout に第2引数が入ると DOM ではなく NodeJS のものだと判定され、返り値がおかしくなる
declare function setTimeout(callback: () => void, timeout: number): number

export async function resolveOnScrollEnd(target: HTMLElement, interval: number) {
  await new Promise<void>((resolve) => {
    let timeout: number;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        target.removeEventListener('scroll', onScroll);
        resolve();
      }, interval);
    }
    target.addEventListener('scroll', onScroll);
    onScroll();
  });
}
