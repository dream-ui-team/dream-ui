import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
//import storage from '@react-native-community/async-storage';
import { AsyncStorage } from "react-native";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
