import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/configureStore';
import Homepage from '../components/home';
import CurrencyRates from '../components/crRates';

//  afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
});

describe('Homepage and currencyRate', () => {
  it('should render the homepage component', () => {
    //  useNavigate() may be used only in the context of a <Router> component.

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Currency Exchange Rates')).toBeInTheDocument();
  });
  it('should render the currencyRate component', () => {
    const rates = render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrencyRates currency={{ code: 'USD', name: 'United States Dollar' }} />
        </BrowserRouter>
      </Provider>,
    );
    expect(rates).toMatchSnapshot();
  });
});
