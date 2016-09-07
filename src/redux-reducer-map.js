const createReducerViaMap = (map, initial) =>
  (state, action) => {
    if (typeof state === 'undefined') {
      return initial
    } else {
      return state
    }
  }

export default createReducerViaMap
