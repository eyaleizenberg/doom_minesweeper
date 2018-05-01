import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import immutableStateInvariant from 'redux-immutable-state-invariant';
declare const devToolsExtension: any;
const withDevTools = () =>
  typeof devToolsExtension === 'function' ? devToolsExtension() : (f: any) => f;

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(immutableStateInvariant());
}

const enhancer = compose(applyMiddleware(...middlewares), withDevTools());

export default function configureStore({ initialState = {} }) {
  const store = createStore(reducer, initialState, enhancer);
  //
  // if (module.hot) {
  //   module.hot.accept('redux/reducers', () => {
  //     const nextRootReducer = reducer.default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }
  return store;
}
