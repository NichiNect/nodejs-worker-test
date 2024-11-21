const { workerData, parentPort } = require('node:worker_threads');

// ? Access the shared buffer
const buffer = new Uint8Array(workerData.sharedBuffer);

for (let i=0; i<buffer.length; i++) {
    if (i%2 == 0) {
        buffer[i] = 7;
    } else {
        buffer[i] = 10;
    }
}

parentPort.postMessage('done');
