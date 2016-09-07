'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReducerViaMap = function createReducerViaMap(map, initial) {
  return function (state, action) {
    if (typeof state === 'undefined') {
      return initial;
    } else if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action);
    } else {
      throw new Error('Unknown action type ' + action.type);
    }
  };
};

exports.default = createReducerViaMap;