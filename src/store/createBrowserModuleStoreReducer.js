import { combineReducers } from 'redux/src';

const MODULE_INIT_TYPE = '@@alp-redux/INIT_MODULE';

// https://github.com/insin/react-examples/tree/master/code-splitting-redux-reducers
// https://medium.com/@luigiplr/react-redux-react-router-4-code-splitting-w-rxjs-webpack-32eabedf0e9
// https://gist.github.com/gaearon/0a2213881b5d53973514
// https://github.com/zeit/next.js/pull/1459

export default (initialReducers: Object) => {
  let _reducers = initialReducers;
  let combinedReducers = initialReducers ? combineReducers(initialReducers) : state => state;
  return {
    reducer: (state, action) =>
      combinedReducers(action.type === MODULE_INIT_TYPE ? undefined : state, action),

    set: (store, reducers) => {
      if (reducers === _reducers) return false;
      console.log('set reducers', reducers, _reducers);
      return new Promise((resolve, reject) => {
        setImmediate(() => {
          _reducers = reducers;
          combinedReducers = combineReducers(reducers);
          store.dispatch({ type: MODULE_INIT_TYPE });
          resolve();
        });
      });
    },
  };
};