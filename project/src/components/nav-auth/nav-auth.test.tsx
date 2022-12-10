import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeUserData } from '../../utils/mocks';
import NavAuth from './nav-auth';

const fakeUser = makeFakeUserData();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Component HeaderNavAuth', ()=> {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <NavAuth user={fakeUser}/>
      </Provider>
    );

    expect(screen.getByText(new RegExp(fakeUser.email))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('when user clicked "Sign out" should dispatch logoutAction', async () => {
    render(
      <Provider store={store}>
        <NavAuth user={fakeUser}/>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(store.getActions()[0].type).toBe('user/logout/pending');
  });
});
