function fibonacci(n) {
    return n < 1 ? 0
        : n <= 2 ? 1
        : fibonacci(n - 1) + fibonacci(n - 2);
}

const doFibo = (iterations) => new Promise((resolve) => {
    const start = Date.now();

    const result = fibonacci(iterations);
    console.log(`doFibo done in: ${Date.now() - start}ms`);
    resolve(result);
});

const main = async () => {
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
        doFibo(40),
        doFibo(40),
        doFibo(40),
    ]);

    console.log('values: ', values);
    console.log(`all fibo done in ${Date.now() - start}ms`);
}

main().catch((err) => {
    console.error(err);
});