import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import AuthActions from '../actions/authr'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(){
    const store = createStoreWithMiddleware(rootReducer);
    return store; 
}
