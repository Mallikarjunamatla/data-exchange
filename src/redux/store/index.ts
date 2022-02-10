import { applyMiddleware, createStore } from "redux";
// import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import rootReducers from "../reducer/reducers";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(rootReducers ,{},composeWithDevTools(applyMiddleware(thunkMiddleware)));
// const persistor = persistStore(store);

export  { store };