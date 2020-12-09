import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import sagaMiddleware from './middleware'

import reducers from './reducers'

export default createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
