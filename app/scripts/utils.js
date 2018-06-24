function promisify(namespace, method) {
    const func = namespace[method];
    return (...args) => new Promise((resolve, reject) => {
        if (typeof func !== "function") {
            reject("Not valid function");
            return;
        }

        func(...args, (err, ...rest) => {
            if (err) reject(err);
            else resolve(...rest);
        });
    });
}

module.exports = {
    promisify,
};
