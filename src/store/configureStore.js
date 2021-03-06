import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer
});

let composeEnhansers = compose;

if (__DEV__) {
    composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhansers(applyMiddleware(thunk)));
};

export default configureStore;
