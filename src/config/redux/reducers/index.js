import {combineReducers} from 'redux'

import auth from './auth'
import keywordReducer from './keywordReducer'

export default combineReducers( 
    { 
    auth, 
    keywordReducer
    }
)