// Redux
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// Combined Reducers
import {rootReducer} from './combineReducers'

// store
export const store = createStore(rootReducer,applyMiddleware(thunk));

