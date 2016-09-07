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
})
