function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import render from 'fody';
import Logger from 'nightingale-logger';
import isModernBrowser from 'modern-browsers';
import { createStore, combineReducers } from 'redux';
import AlpLayout from './layout/AlpLayout';
import AlpReactApp from './AlpReactApp';
import AlpReduxApp from './AlpReduxApp';
import * as alpReducers from './reducers';
import { ModuleDescriptorType as _ModuleDescriptorType } from './types';

import t from 'flow-runtime';
var ModuleDescriptorType = t.tdz(function () {
  return _ModuleDescriptorType;
});
export { AlpReactApp, AlpReduxApp };
export { Helmet } from 'fody';
export { combineReducers } from 'redux';
export { connect } from 'react-redux';
import _createPureStatelessComponent from 'react-pure-stateless-component';
export { _createPureStatelessComponent as createPureStatelessComponent };

export { createAction, createReducer, createLoader, classNames } from './utils';
export { AlpHtml, AlpLayout, AlpHead, AlpBody } from './layout';

throw new Error('Not supposed to be loaded browser-side.');

var logger = new Logger('alp:react-redux');

var OptionsType = t.type('OptionsType', t.exactObject(t.property('Layout', t.nullable(t.any())), t.property('sharedReducers', t.nullable(t.object()))));


export default function alpReactRedux() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$Layout = _ref.Layout,
      Layout = _ref$Layout === undefined ? AlpLayout : _ref$Layout,
      _ref$sharedReducers = _ref.sharedReducers,
      sharedReducers = _ref$sharedReducers === undefined ? {} : _ref$sharedReducers;

  if (arguments[0] !== undefined) {
    t.param('arguments[0]', OptionsType).assert(arguments[0]);
  }

  return function (app) {
    var _appType = t.object();

    t.param('app', _appType).assert(app);

    app.context.render = function (moduleDescriptor, data, _loaded) {
      var _this = this;

      var _moduleDescriptorType = t.ref(ModuleDescriptorType);

      var _dataType = t.nullable(t.object());

      t.param('moduleDescriptor', _moduleDescriptorType).assert(moduleDescriptor);
      t.param('data', _dataType).assert(data);

      logger.debug('render view', { data: data });

      if (!_loaded && moduleDescriptor.loader) {
        // const _state = data;
        return moduleDescriptor.loader(Object.create(null), data).then(function (data) {
          return _this.render(moduleDescriptor, data, true);
        });
      }

      var moduleHasReducers = !!(moduleDescriptor.reducer || moduleDescriptor.reducers);
      var reducer = moduleDescriptor.reducer ? moduleDescriptor.reducer : combineReducers(Object.assign({}, moduleDescriptor.reducers, alpReducers, sharedReducers));

      if (reducer) {
        this.store = createStore(reducer, Object.assign({ context: this }, data));
      }

      var version = t.string().assert(this.config.get('version'));
      var moduleIdentifier = t.nullable(t.string()).assert(moduleDescriptor && moduleDescriptor.identifier);

      // eslint-disable-next-line no-unused-vars

      var _ref2 = moduleHasReducers ? this.store.getState() : {},
          unusedContext = _ref2.context,
          initialData = _objectWithoutProperties(_ref2, ['context']);

      this.body = render({
        Layout: Layout,
        layoutProps: {
          version: version,
          moduleIdentifier: moduleIdentifier,
          scriptName: function () {
            // TODO create alp-useragent with getter in context
            var ua = _this.req.headers['user-agent'];
            return isModernBrowser(ua) ? 'modern-browsers' : 'es5';
          }(),
          initialBrowserContext: this.computeInitialContextForBrowser(),
          initialData: moduleHasReducers ? initialData : null
        },

        App: reducer ? AlpReduxApp : AlpReactApp,
        appProps: {
          store: this.store,
          context: this
        },

        View: moduleDescriptor.View,
        props: moduleHasReducers ? undefined : data
      });
    };
  };
}

var loggerWebsocket = logger.child('websocket');

export function emitAction(to, action) {
  loggerWebsocket.debug('emitAction', action);
  to.emit('redux:action', action);
}
//# sourceMappingURL=index.js.map