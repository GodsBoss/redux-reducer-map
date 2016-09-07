'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultonUnknownActionTypeHandler = function defaultonUnknownActionTypeHandler(state, action) {
  var error = new Error('Unknown action type ' + action.type);
  error.state = state;
  error.action = action;
  throw error;
};

var createReducerViaMap = function createReducerViaMap(map, initial) {
  var onUnknownActionType = arguments.length <= 2 || arguments[2] === undefined ? defaultonUnknownActionTypeHandler : arguments[2];
  return function (state, action) {
    if (typeof state === 'undefined') {
      return initial;
    } else if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action);
    } else {
      return onUnknownActionType(state, action);
    }
  };
};

exports.default = createReducerViaMap;