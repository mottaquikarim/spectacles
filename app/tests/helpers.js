const helpers = {};

helpers.isPromise = obj => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

module.exports = helpers;
