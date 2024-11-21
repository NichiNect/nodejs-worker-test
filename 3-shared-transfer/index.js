const { Worker } = require('node:worker_threads');

// ? Create shared buffer
const sharedBuffer = new SharedArrayBuffer(5);
const buffer = new Uint8Array(sharedBuffer);
buffer.fill(5);

console.log('Buffer befor modify:', buffer);
// should be [5,5,5,5,5]

// ? Create a worker & pass the shared buffer
const worker = new Worker('./3-shared-transfer/w.js', {
    workerData: { sharedBuffer }
});

worker.once('message', () => {
    console.log('Buffer after modify:', buffer);
    // should be [7,10,7,10,7]
});
