[![Build Status](https://travis-ci.org/GodsBoss/redux-reducer-map.svg?branch=master)](https://travis-ci.org/GodsBoss/redux-reducer-map)
[![Build Status](https://semaphoreci.com/api/v1/GodsBoss/redux-reducer-map/branches/master/badge.svg)](https://semaphoreci.com/GodsBoss/redux-reducer-map)
[![CircleCI](https://circleci.com/gh/GodsBoss/redux-reducer-map/tree/master.svg?style=svg)](https://circleci.com/gh/GodsBoss/redux-reducer-map/tree/master)
[![wercker status](https://app.wercker.com/status/e55c5f53008a576767756aec6da776e4/m/master "wercker status")](https://app.wercker.com/project/byKey/e55c5f53008a576767756aec6da776e4)

About
=====

Build a reducer out of a map of reducer functions.

Installation
============

```sh
npm install --save @godsboss/redux-reducer-map
```

Usage
=====

### Initial state

When creating the reducer, you have to give it an initial state which is
returned when the combined reducer is called with an `undefined` state:

```javascript
import createMapReducer from '@godsboss/redux-reducer-map'
import { createStore } from 'redux'

const reducerMap = {}
const initialState = { value: 123 }
const store = createStore(createMapReducer(reducerMap, initialState))

let value = store.getState().value // 123
```

### Combining reducers

Given some actions and reducers:

```javascript
// Action types
const INC = "INC"
const DEC = "DEC"

// Action creators
const createInc = (value) => ({ type: INC, value })
const createDec = (value) => ({ type: DEC, value })

// Reducing functions
const inc = (state, action) => ({ value: state.value + action.value })
const dec = (state, action) => ({ value: state.value - action.value })
```

Create a map of your reducing functions, action types are property names:

```javascript
let reducerMap = {}
reducerMap[INC] = inc
reducerMap[DEC] = dec
```

Then create the reducer, the store, and use it:

```javascript
import createMapReducer from '@godsboss/redux-reducer-map'
import { createStore } from 'redux'

const initialState = { value: 0 }
const store = createStore(createMapReducer(reducerMap, initialState))

store.dispatch(createInc(200))
store.getState().value // 200

store.dispatch(createDec(150))
store.getState().value // 50
```

### Unknown action types

By default, calling the reducer with an unknown action type (i.e. not found in
the map) throws an error:

```javascript
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
```

This is by design. Unknown action types very likely point to a design and/or
programming error, like a misspelling (you _do_ use action creators, right?) or
a forgotten action still dispatched somewhere.

But this is configurable, there is an optional third parameter which is a
reducer-like callback:

```javascript
const onUnknownAction = (state, action) => {
  console.log('Unknown action!', state, action)
  return state
}
const store = createStore(createMapReducer(reducerMap, initialState, onUnknownAction))
```

There is a convenience function which just returns the state:

```javascript
const store = createStore(createMapReducer(reducerMap, initialState, createMapReducer.justReturnState))
```

Running the tests
=================

```sh
npm install
npm test
```

Development
===========

Tests can be found in `test`. Pull requests without accompanying tests will be
rejected.

The library source code is inside the `src` directory. It is then compiled
via `npm run-script build` (`npm install` beforehand is needed) into the `dist`
folder.
