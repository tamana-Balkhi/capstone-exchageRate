import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './Api/fetchCRapi';
import currencyRateByCodeReducer from './Api/currencyByCode';

const rootReducer = combineReducers({
  currencies: currenciesReducer,
  currencyRateByCode: currencyRateByCodeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
