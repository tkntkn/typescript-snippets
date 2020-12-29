function substringBetween(str: string, begin: string, end: string) {
    const beginIndex = str.indexOf(begin);
    const endIndex = str.lastIndexOf(end);
    return str.slice(beginIndex + begin.length, endIndex);
}

export async function sideKick<T>(procedure: (this: Worker) => T, option?: WorkerOptions) {
    function inWorker(this: Worker) {
        this.addEventListener('message', async (event) => {
            const procedure = event.data;
            const result = await Function(`return ${procedure}`)()(this);
            this.postMessage(result);
        });
    }

    const inWorkerString = substringBetween(inWorker.toString(), '{', '}');
    const inWorkerUrl = URL.createObjectURL(new Blob([inWorkerString]));
    const worker = new Worker(inWorkerUrl, option);

    const result = await new Promise<T>((resolve) => {
        const onMessage = (event: MessageEvent<T>) => {
            worker.removeEventListener('message', onMessage);
            resolve(event.data);
        }
        worker.addEventListener('message', onMessage);
        worker.postMessage(procedure.toString());
    })
    
    worker.terminate();
    URL.revokeObjectURL(inWorkerUrl);
    return result;
}

(async function testSideKick() {
    const result = await sideKick(function () {
        const workHard = (second: number) => {
            const begin = +new Date();
            console.log(this);
            let count = 0;
            while (true) {
                count += 1;
                const passed = +new Date() - begin;
                if (passed > second * 1000) {
                    break;
                }
            }
            return count;
        }
        return workHard(10);
    });
    console.log(result);
})();
