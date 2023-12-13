import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { reducer as appReducer } from "./reducer";
import { reducer as snackbar } from "./snackbar/reducer";

const rootReducer = combineReducers({
  appReducer,
  snackbar,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export { store };
