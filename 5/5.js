function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises))
            return reject(new Error('Input must be an array'));

        const results = [];
        let completed = 0;

        if (promises.length === 0)
            return resolve(results);

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

const test1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));
const test2 = new Promise((resolve) => setTimeout(() => resolve("test2"), 200));
const test3 = new Promise((resolve) => setTimeout(() => resolve(3 + 3), 300));

myPromiseAll([test1, test2, test3]).then(results => {
    console.log(results); 
});