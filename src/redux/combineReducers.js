import {combineReducers} from 'redux'

import {treeReducer} from './tree/treeReducer'

export const rootReducer = combineReducers({
    tree: treeReducer
})