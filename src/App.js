import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllCurrencies } from './redux/Api/fetchCRapi';
import Homepage from './components/home';
import Currency from './components/crRates';
import './App.css';

function App() {
  const currencies = useSelector((state) => state.currencies);
  const dispatch = useDispatch();
  const currenciesArray = Object.keys(currencies[0]).map((key) => ({
    code: key,
    name: currencies[0][key],
  }));
  useEffect(() => {
    if (currenciesArray.length === 0) {
      dispatch(fetchAllCurrencies());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* routes to fetch all currencies by code */}
          {currenciesArray.map((currency) => (
            <Route key={currency.code} path={`/currency/${currency.code}`} element={<Currency currency={currency} />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
