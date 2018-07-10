import { createStore, combineReducers, compose } from 'redux';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

let composeEnhansers = compose;

if (__DEV__) {
    composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhansers());
};

export default configureStore;
