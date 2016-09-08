About
=====

Build a reducer out of a map of reducer functions.

Installation
============

    npm install --save @godsboss/redux-reducer-map

Usage
=====

### Initial state

When creating the reducer, you have to give it an initial state which is
returned when the combined reducer is called with an `undefined` state:

    import createMapReducer from '@godsboss/redux-reducer-map'
    import { createStore } from 'redux'

    const reducerMap = {}
    const initialState = { value: 123 }
    const store = createStore(createMapReducer(reducerMap, initialState))

    let value = store.getState().value // 123

### Combining reducers

Given some actions and reducers:

    // Action types
    const INC = "INC"
    const DEC = "DEC"

    // Action creators
    const createInc = (value) => ({ type: INC, value })
    const createDec = (value) => ({ type: DEC, value })

    // Reducing functions
    const inc = (state, action) => ({ value: state.value + action.value })
    const dec = (state, action) => ({ value: state.value - action.value })

Create a map of your reducing functions, action types are property names:

    let reducerMap = {}
    reducerMap[INC] = inc
    reducerMap[DEC] = dec

Then create the reducer, the store, and use it:

    import createMapReducer from '@godsboss/redux-reducer-map'
    import { createStore } from 'redux'

    const initialState = { value: 0 }
    const store = createStore(createMapReducer(reducerMap, initialState))

    store.dispatch(createInc(200))
    store.getState().value // 200

    store.dispatch(createDec(150))
    store.getState().value // 50

### Unknown action types

By default, calling the reducer with an unknown action type (i.e. not found in
the map) throws an error:

    import createMapReducer from '@godsboss/redux-reducer-map'
    import { createStore } from 'redux'

    const reducerMap = {}
    const initialState = {}
    const store = createStore(createMapReducer(reducerMap, initialState))

    const action = { type: "NOT_FOUND" }
    try {
      store.dispatch(action)
    } catch (error) {
      console.log(error.state)
      console.log(error.action)
    }

This is by design. Unknown action types very likely point to a design and/or
programming error, like a misspelling (you _do_ use action creators, right?) or
a forgotten action still dispatched somewhere.

But this is configurable, there is an optional third parameter which is a
reducer-like callback:

    const onUnknownAction = (state, action) => {
      console.log('Unknown action!', state, action)
      return state
    }
    const store = createStore(createMapReducer(reducerMap, initialState, onUnknownAction))

There is a convenience function which just returns the state:

    const store = createStore(createMapReducer(reducerMap, initialState, createMapReducer.justReturnState))
