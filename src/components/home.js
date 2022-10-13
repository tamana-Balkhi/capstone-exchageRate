import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { BsArrowRightCircle, BsCurrencyExchange } from 'react-icons/bs';
import { fetchAllCurrencies, displaySingleCurrency, displayCurrencies } from '../redux/Api/fetchCRapi';
import Nav from './navbar';
import '../App.css';

const Homepage = () => {
  const currencies = useSelector((state) => state.currencies);
  const dispatch = useDispatch();
  const currenciesArray = Object.keys(currencies[0]).map((key) => ({
    code: key,
    name: currencies[0][key],
  }));

  const currencyArray = Object.keys(currencies[1]).map((key) => ({
    code: key,
    name: currencies[1][key],
  }));

  const dataToDisplayFunc = () => ((currencyArray.length !== 0) ? currencyArray : currenciesArray);
  const dataToDisplay = dataToDisplayFunc();

  const showPreferedCurrency = (e) => {
    const code = e.target.value;
    if (code === 'allc') {
      dispatch(displayCurrencies());
    } else {
      dispatch(displaySingleCurrency(code));
    }
    // remove focus from the select element
    e.target.blur();
  };

  useEffect(() => {
    if (currenciesArray.length === 0) {
      dispatch(fetchAllCurrencies());
    }
  }, []);

  const navigate = useNavigate();

  const redirectToCurrency = (code) => {
    navigate(`/currency/${code}`);
  };

  return (
    <>
      <header>
        <Nav text="Currencies Exchange">
          <select onChange={showPreferedCurrency}>
            {/* default options to be all currencies */}
            <option value="allc">All Currencies</option>
            {currenciesArray.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </Nav>
        <div className="all-currencies-header">
          <div className="all-currency-icon">
            <BsCurrencyExchange />
          </div>
          <div className="all-currency-text">
            <p>Currency Exchange Rates</p>
          </div>
        </div>
        <p>STAT BY CURRENCY CODE</p>
      </header>
      <section
        className={
        `${(currencyArray.length) === 1 ? 'single-currency-container' : 'all-currencies-container'}`
      }
      >
        {' '}
        {dataToDisplay.map((currency) => (
          <button data-testid="currency" type="button" key={currency.code} onClick={() => redirectToCurrency(currency.code)}>
            <div className="currency-container">
              <span className="forward-icon">
                <BsArrowRightCircle />
              </span>
              {
              (getSymbolFromCurrency(currency.code)) ? (
                <span className="currency-symbol">
                  {getSymbolFromCurrency(currency.code)}
                </span>
              ) : (
                <span className="currency-symbol">
                  {currency.code[0].toUpperCase() + currency.code[1]}
                </span>
              )
            }
              {/* routes to fetch all currencies by code */}
              <div className="currency-name">
                <Link to={`/currency/${currency.code}`}>
                  {currency.name}
                </Link>
              </div>
              <div className="currency-code">{currency.code.toUpperCase()}</div>
            </div>
          </button>
        ))}
      </section>
    </>
  );
};

export default Homepage;
