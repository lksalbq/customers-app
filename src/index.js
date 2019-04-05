import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";

// Components Imports
import LayoutApp from "./shared/layout/layout";
import requireAuth from "./auth/RequireAuth";
import requireNotAuth from "./auth/RequireNotAuth";
import Login from "./scenes/login";
import Customers from "./scenes/customers";
import CustomersForm from "./scenes/customers/_/containers/customers-form";
import CustomersEdit from "./scenes/customers/_/containers/customers-edit/customers-edit";

const persistConfig = {
  key: "rootPersist",
  storage,
  blacklist: ["auth"]
};

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

const Root = () => (
  <BrowserRouter>
    <div>
      <LayoutApp>
        <Switch>
          <Route exact={true} path="/" component={requireNotAuth(Login)} />
          <Route
            exact={true}
            path="/customers"
            component={requireAuth(Customers)}
          />
          <Route
            exact={true}
            path="/customers/register"
            component={requireAuth(CustomersForm)}
          />
          <Route
            exact={true}
            path="/customers/:id/edit"
            component={requireAuth(CustomersEdit)}
          />
        </Switch>
      </LayoutApp>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
