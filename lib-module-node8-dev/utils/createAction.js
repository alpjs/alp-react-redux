var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import t from "flow-runtime";
// eslint-disable-next-line flowtype/no-weak-types
const HandlerType = t.type("HandlerType", t.function(t.rest("args", t.array(t.any())), t.return(t.object())));


export default (function createAction(type, handler) {
  let _typeType = t.string();

  let _handlerType = t.nullable(HandlerType);

  t.param("type", _typeType).assert(type);
  t.param("handler", _handlerType).assert(handler);

  const action = !handler ? () => ({ type }) : (...args) => _extends({ type }, handler(...args));
  action.type = type;
  action.toString = () => type;
  return action;
});
//# sourceMappingURL=createAction.js.map