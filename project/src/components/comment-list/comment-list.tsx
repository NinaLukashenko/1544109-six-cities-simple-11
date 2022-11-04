import { Reviews } from '../../types/reviews';
import Comment from '../comment/comment';

type CommentListProps = {
  comments: Reviews;
}

const CommentList = ({comments}: CommentListProps) => (
  <ul className="reviews__list">
    {comments.map((item) => <Comment key={item.id} comment={item}/>)};
  </ul>
);

export default CommentList;
