import createReducerViaMap from '../dist/redux-reducer-map'
import expect from 'expect.js'

describe('Reducer created via Redux Reducer Map', () => {

  it('returns the initial state if given none', () => {

    const initialState = { foo: 'bar' }
    const reducedState = createReducerViaMap({}, initialState)(undefined, { type: 'NOP' })

    expect(reducedState).to.eql(initialState)
  })

  it('passes state and action to the appropriate function of the map', () => {

    const reduce = createReducerViaMap(
      {
        USED: (state, action) => ({ reducer: 'USED', action: action, state: state }),
        UNUSED: (state, action) => ({ reducer: 'UNUSED'})
      },
      {}
    )

    const reducedState = reduce({ value: 1500 }, { type: 'USED', value: 2500})

    expect(reducedState.reducer).to.be('USED')
    expect(reducedState.state.value).to.be(1500)
    expect(reducedState.action.value).to.be(2500)
  })

  it('throws an error by default if action type is not found', () => {
    const UNKNOWN_ACTION_TYPE = 'UNKNOWN'
    const usingUnknownActionType = () => {
      createReducerViaMap({}, {})({}, { type: UNKNOWN_ACTION_TYPE })
    }
    expect(usingUnknownActionType).to.throwException((e) => {
      expect(e.message).to.contain(UNKNOWN_ACTION_TYPE)
    })
  })
})
