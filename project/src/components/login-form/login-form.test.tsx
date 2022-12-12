import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import LoginForm from './login-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

  });

  it('typed text should be', async () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('email'), 'test@test.com');
    await userEvent.type(screen.getByTestId('password'), '123abc');

    expect(screen.getByDisplayValue(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123abc/i)).toBeInTheDocument();
  });

  it('handleFormSubmit should be called when user click Sign in button', async ()=> {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );

    expect(store.getActions()).toEqual([]);

    await userEvent.type(screen.getByTestId('email'), 'test@test.com');
    await userEvent.type(screen.getByTestId('password'), '123abc');

    await userEvent.click(screen.getByTestId('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('user/login/pending');
  });
});
