import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	StoreEnhancer,
} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import { userListReducer } from './Users';

const appReducer = combineReducers({
	usersList: userListReducer,
});

const rootReducer = (state: any, action: any) => {
	return appReducer(state, action);
};

const storeEnhancers: StoreEnhancer = compose(
	applyMiddleware(thunk),
	devToolsEnhancer({}),
);

const store = createStore(rootReducer, storeEnhancers);

export default store;
