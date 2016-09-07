const createReducerViaMap = (map, initial) =>
  (state, action) => {
    if (typeof state === 'undefined') {
      return initial
    } else if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action)
    } else {
      throw new Error('Unknown action type ' + action.type)
    }
  }

export default createReducerViaMap
