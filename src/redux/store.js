import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'

let rootReducer = combineReducers({
    auth:authReducer
})

let store = createStore(rootReducer,applyMiddleware(thunk))

export default store