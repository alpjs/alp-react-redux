'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const promiseMiddleware = exports.promiseMiddleware = store => {
    return next => {
        return action => {
            if (typeof action.then !== 'function') {
                return next(action);
            }

            return Promise.resolve(action).then(store.dispatch);
        };
    };
};

const createFunctionMiddleware = exports.createFunctionMiddleware = app => {
    return store => {
        return next => {
            return action => {
                if (typeof action !== 'function') {
                    return next(action);
                }

                return action(store.dispatch, app);
            };
        };
    };
};
//# sourceMappingURL=middlewares.js.map