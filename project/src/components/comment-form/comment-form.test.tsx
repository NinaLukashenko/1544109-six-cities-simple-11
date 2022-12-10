import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeCommentText } from '../../utils/mocks';
import CommentForm from './comment-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockText = makeFakeCommentText();

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      CURRENT_OFFER: {
        isCommentSending: false,
        isResetingCommentForm: false,
      }
    });

    render(
      <Provider store={store}>
        <CommentForm hotelId={1}/>
      </Provider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);

    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
    expect(textbox.getAttribute('disabled')).toBe(null);

    expect(screen.getByText(/describe your stay/i)).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('style')).toBe('pointer-events: none;');
    expect(button.getAttribute('disabled')).not.toBe(null);

    expect(screen.getAllByText(/Submit/i)).toHaveLength(2);
  });

  it('typed text should be', async () => {
    const store = mockStore({
      CURRENT_OFFER: {
        isCommentSending: false,
        isResetingCommentForm: false,
      }
    });

    render(
      <Provider store={store}>
        <CommentForm hotelId={1}/>
      </Provider>
    );

    await userEvent.type(screen.getByRole('textbox'), mockText);
    expect(screen.getByDisplayValue(new RegExp(mockText))).toBeInTheDocument();
  });
});
