var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]); } return target; };

import t from "flow-runtime";
// eslint-disable-next-line flowtype/no-weak-types
var HandlerType = t.type("HandlerType", t.function(t.rest("args", t.array(t.any())), t.return(t.object())));


export default (function createAction(type, handler) {
  var _typeType = t.string();

  var _handlerType = t.nullable(HandlerType);

  t.param("type", _typeType).assert(type), t.param("handler", _handlerType).assert(handler);

  var action = handler ? function () {
    return _extends({ type: type }, handler.apply(void 0, arguments));
  } : function () {
    return { type: type };
  };

  return action.type = type, action.toString = function () {
    return type;
  }, action;
});
//# sourceMappingURL=createAction.js.map