import { FIRST_OFFER_COMMENT_INDEX, OFFER_COMMENTS_MAX_QUANTITY } from '../../consts/offer';
import { Reviews } from '../../types/reviews';
import Comment from '../comment/comment';

const sortComments = (reviews: Reviews) => [...reviews].sort((a, b) => a.date < b.date ? 1 : -1);

type CommentListProps = {
  comments: Reviews;
}

const CommentList = ({ comments }: CommentListProps) => {
  const sortedComments = sortComments(comments);

  const displayedComments = sortedComments.slice(FIRST_OFFER_COMMENT_INDEX, OFFER_COMMENTS_MAX_QUANTITY);

  return (
    <ul className="reviews__list">
      {displayedComments.map((item) => <Comment key={item.id} comment={item}/>)}
    </ul>
  );
};

export default CommentList;
