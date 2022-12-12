import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts/app';
import { makeFakeComments, makeFakeUserData } from '../../utils/mocks';
import Reviews from './reviews';

const mockStore = configureMockStore();

const mockComments = makeFakeComments();

describe('Component: Reviews', () => {
  it('should render correctly when user has status "Auth"', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUserData(),
      },
      CURRENT_OFFER: {
        comments: mockComments,
      }
    });

    render(
      <Provider store={store}>
        <Reviews
          hotelId={1}
          className='fake-class-name'
        />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockComments.length);
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly when user has status "NoAuth"', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: makeFakeUserData(),
      },
      CURRENT_OFFER: {
        comments: mockComments,
      }
    });

    render(
      <Provider store={store}>
        <Reviews
          hotelId={1}
          className='fake-class-name'
        />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockComments.length);
    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
