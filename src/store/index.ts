import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import customerProductReducer from "./reducers/customer.reducer";
import totalPrice from "./reducers/totalPay.reducer";

import authReducer from "./reducers/auth.reduder";

const rootReducer = combineReducers({
  authReducer,
  totalPrice,
  customerProductReducer,
});

const store: ToolkitStore = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
