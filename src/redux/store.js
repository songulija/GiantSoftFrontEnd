import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {usersReducer} from './reducers/usersReducer';

const allReducers = combineReducers({
    usersReducer
});
//we want to get userInfo from localStorage if its there. if its  there we need to convert JSON string into object
const userInfoFromStorage = localStorage.getItem('currentUser');

//and we want to add our userInfoFromStorage to initial state. add userLogin and inside set userInfo to userInfoFromStorage
//so that data will always come from local storage if its there. so that will be loaded when store is loaded
const initialState = {
    usersReducer: { currentUser: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(allReducers,initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;