import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/default";
import Thunk from "redux-thunk";
// import {addArticle} from "../actions/index";
const store = createStore(rootReducer, applyMiddleware(Thunk));
// store.subscribe(() => console.log("Look ma, Redux!!"));
// store.dispatch(addArticle({ title: "React Redux Tutorial for Beginners", id: 1 }));
// store.getState();
export default store;
