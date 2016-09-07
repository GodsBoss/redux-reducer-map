import createReducerViaMap from '../dist/redux-reducer-map'
import expect from 'expect.js'

describe('Reducer created via Redux Reducer Map', () => {

  it('returns the initial state if given none', () => {

    const initialState = { foo: 'bar' }
    const reducedState = createReducerViaMap({}, initialState)(undefined, { type: 'NOP' })

    expect(reducedState).to.eql(initialState)
  })
})
