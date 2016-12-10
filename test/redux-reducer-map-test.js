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
    const STATE_VALUE = 1500
    const ACTION_VALUE = 2500
    const state = { value: STATE_VALUE }
    const action = { type: 'USED', value: ACTION_VALUE }
    const reducedState = reduce(state, action)

    expect(reducedState.reducer).to.be('USED')
    expect(reducedState.state.value).to.be(STATE_VALUE)
    expect(reducedState.action.value).to.be(ACTION_VALUE)
  })

  it('throws an error by default if action type is not found', () => {
    const UNKNOWN_ACTION_TYPE = 'UNKNOWN'
    const reducerMap = {}
    const reduce = createReducerViaMap(reducerMap, EMPTY_STATE)
    const state = { value: 'Some value' }
    const action = { type: UNKNOWN_ACTION_TYPE }

    const usingUnknownActionType = () => {
      reduce(state, action)
    }

    expect(usingUnknownActionType).to.throwException((e) => {
      expect(e.message).to.contain(UNKNOWN_ACTION_TYPE)
      expect(e.state).to.eql(state)
      expect(e.action).to.eql(action)
    })
  })

  it('allows overriding default error handling behaviour on unknown action types', () => {
    const UNKNOWN_ACTION_TYPE = 'UNKNOWN'
    const reducerMap = {}
    const customErrorHandler = (state, action) => (
      {
        state: state,
        action: action
      }
    )
    const reduce = createReducerViaMap(reducerMap, EMPTY_STATE, customErrorHandler)
    const state = { value: 42 }
    const action = { type: UNKNOWN_ACTION_TYPE, value: 666 }
    const reducedState = reduce(state, action)

    expect(reducedState.state).to.eql(state)
    expect(reducedState.action).to.eql(action)
  })

  it('provides a convenience error handler for returning the state unchanged', () => {
    const UNKNOWN_ACTION_TYPE = 'UNKNOWN'
    const reducerMap = {}
    const reduce = createReducerViaMap(reducerMap, EMPTY_STATE, createReducerViaMap.justReturnState)

    const state = { value: 42 }
    const action = { type: UNKNOWN_ACTION_TYPE, value: 666 }
    const reducedState = reduce(state, action)

    expect(reducedState).to.eql(state)
  })

  it("returns the initial state when given redux's init action", () => {
    const action = { type: '@@redux/INIT' }
    const reducerMap = {}
    const initialState = { value: 666 }
    const reduce = createReducerViaMap(reducerMap, initialState)
    const reducedState = reduce(EMPTY_STATE, action)

    expect(reducedState).to.eql(initialState)
  })

  it("lets the user override the reducer for redux's init action", () => {
    const action = { type: '@@redux/INIT' }
    const reducerMap = {
      '@@redux/INIT': (state, action) => ({ originalState: state, action })
    }
    const reduce = createReducerViaMap(reducerMap, EMPTY_STATE)
    const reducedState = reduce(EMPTY_STATE, action)

    expect(reducedState.action).to.eql(action)
    expect(reducedState.originalState).to.eql(EMPTY_STATE)
  })
})
