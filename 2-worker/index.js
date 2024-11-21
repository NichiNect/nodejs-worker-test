const { Worker } = require('node:worker_threads');

const doFibo = async (iterations) => {

    return new Promise((resolve, reject) => {

        const start = Date.now();

        // ? Start Worker
        const worker = new Worker('./2-worker/fibo.js', {
            workerData: {
                iterations
            }
        });

        // ? Listen message from worker
        worker.once('message', (data) => {
            console.log(`worker [${worker.threadId}]: done in ${Date.now() - start}ms`);
            resolve(data);
        });

        // ? Listen for error from worker
        worker.once('error', (err) => reject(err));
    });
}

const main = async () => {

    try {
        const start = Date.now();
        const values = await Promise.all([
            doFibo(40),
            doFibo(40),
            doFibo(40),
            doFibo(40),
            doFibo(40),
            doFibo(40),
            doFibo(40),
            doFibo(40),
        ]);
    
        console.log('values: ', values);
        console.log(`all fibo done in ${Date.now() - start}ms`);
    } catch (err) {
        console.error(err);
    }
}

main().catch((err) => {
    console.error(err);
});
