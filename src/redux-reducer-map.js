const defaultOnUnknownActionTypeHandler = (state, action) => {
  const error = new Error('Unknown action type ' + action.type)
  error.state = state
  error.action = action
  throw error
}

const createReducerViaMap = (map, initial, onUnknownActionType = defaultOnUnknownActionTypeHandler) =>
  (state, action) => {
    if (typeof state === 'undefined') {
      return initial
    } else if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action)
    } else {
      return onUnknownActionType(state, action)
    }
  }

createReducerViaMap.justReturnState = (state, action) => state

export default createReducerViaMap
