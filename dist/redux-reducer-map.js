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
      return state;
    }
  };
};

exports.default = createReducerViaMap;