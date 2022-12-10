import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import Comment from './comment';

const mockComment = makeFakeComment(1);

describe('Component: Comment', () => {
  mockComment.rating = 3.7;
  mockComment.date = '2022-09-26T13:58:46.499Z';
  it('should render correctly', () => {
    render(
      <Comment
        comment={mockComment}
      />
    );

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(screen.getByText(new RegExp(mockComment.user.name))).toBeInTheDocument();

    expect(screen.getByTestId('rate')).toHaveStyle('width: 80%');
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();

    expect(screen.getByText(new RegExp(mockComment.comment))).toBeInTheDocument();

    expect(screen.getByTestId('time').getAttribute('dateTime')).toEqual('2022-09-26');
    expect(screen.getByText('September 2022')).toBeInTheDocument();
  });
});
