'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReducerViaMap = function createReducerViaMap(map, initial) {
  return function (state, action) {
    if (typeof state === 'undefined') {
      return initial;
    } else {
      return state;
    }
  };
};

exports.default = createReducerViaMap;