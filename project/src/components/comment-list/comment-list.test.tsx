import { render, screen } from '@testing-library/react';
import { makeFakeComments } from '../../utils/mocks';
import CommentList from './comment-list';

const mockComments = makeFakeComments();

describe('Component: CommentList', () => {
  it('should render correctly', () => {
    render(
      <CommentList comments={mockComments}/>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockComments.length);
  });
});
