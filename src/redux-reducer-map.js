const defaultonUnknownActionTypeHandler = (state, action) => {
  throw new Error('Unknown action type ' + action.type)
}

const createReducerViaMap = (map, initial, onUnknownActionType = defaultonUnknownActionTypeHandler) =>
  (state, action) => {
    if (typeof state === 'undefined') {
      return initial
    } else if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action)
    } else {
      return onUnknownActionType(state, action)
    }
  }

export default createReducerViaMap
