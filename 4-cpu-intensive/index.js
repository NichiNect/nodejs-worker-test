const jobs = Array.from(
    { length: 100 },
    () => 1e9 // means 1.000.000.000
);

// ? Main thread process
// const start = performance.now();
// for (let job of jobs) {

//     let count = 0;
//     for (let i=0; i<job; i++) {
//         count++;
//     }
// }
// const end = performance.now();

// console.log(`Main thread took ${end - start}ms`);

// ? Split up process
const { Worker } = require('node:worker_threads');

function chuckify(array, n) {
    let chunks = [];

    for (let i=n; i>0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i)));
    }

    return chunks;
}

function run (jobs, concurrentWorker) {

    const chunks = chuckify(jobs, concurrentWorker);

    const start = performance.now();
    let completedWorkers = 0;

    chunks.forEach((data, i) => {

        const worker = new Worker('./4-cpu-intensive/worker.js');
        worker.postMessage(data);

        worker.on('message', () => {
            console.log(`Worker ${i} completed.`);
            completedWorkers++;

            if (completedWorkers === concurrentWorker) {
                console.log(`${concurrentWorker} workers took ${performance.now() - start}ms`);
                process.exit();
            }
        });
    });
}

// The n concurrentWorker = n cpus
run(jobs, 8);
