import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {UserLoginReducer,UserRegisterReducer} from './reducers/usersReducer';

const allReducers = combineReducers({
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer
});
//we want to get userInfo from localStorage if its there. if its  there we need to convert JSON string into object
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

//and we want to add our userInfoFromStorage to initial state. add userLogin and inside set userInfo to userInfoFromStorage
//so that data will always come from local storage if its there. so that will be loaded when store is loaded
const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;