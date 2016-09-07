import createReducerViaMap from '../dist/redux-reducer-map'
import expect from 'expect.js'

describe('Reducer created via Redux Reducer Map', () => {

  const EMPTY_STATE = {}

  it('returns the initial state if given none', () => {

    const initialState = { foo: 'bar' }
    const reducerMap = {}
    const action = { type: 'NOP' }
    const reducedState = createReducerViaMap(reducerMap, initialState)(undefined, action)

    expect(reducedState).to.eql(initialState)
  })

  it('passes state and action to the appropriate function of the map', () => {

    const reducerMap = {
      USED: (state, action) => ({ reducer: 'USED', action: action, state: state }),
      UNUSED: (state, action) => ({ reducer: 'UNUSED'})
    }
    const reduce = createReducerViaMap(reducerMap, EMPTY_STATE)
    const state = { value: 1500 }
    const action = { type: 'USED', value: 2500 }
    const reducedState = reduce(state, action)

    expect(reducedState.reducer).to.be('USED')
    expect(reducedState.state.value).to.be(1500)
    expect(reducedState.action.value).to.be(2500)
  })

  it('throws an error by default if action type is not found', () => {
    const UNKNOWN_ACTION_TYPE = 'UNKNOWN'
    const usingUnknownActionType = () => {
      const reducerMap = {}
      const action = { type: UNKNOWN_ACTION_TYPE }
      createReducerViaMap(reducerMap, EMPTY_STATE)(EMPTY_STATE, action)
    }
    expect(usingUnknownActionType).to.throwException((e) => {
      expect(e.message).to.contain(UNKNOWN_ACTION_TYPE)
    })
  })
})
