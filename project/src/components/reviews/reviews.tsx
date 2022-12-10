import { AuthorizationStatus } from '../../consts/app';
import { useAppSelector } from '../../hooks';
import { getComments } from '../../store/current-offer-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import CommentForm from '../comment-form/comment-form';
import CommentList from '../comment-list/comment-list';

type ReviewsProps = {
  hotelId: number;
  className: string;
}

const Reviews = ({hotelId, className}: ReviewsProps) => {
  const classes = `${className} reviews`;

  const authStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getComments);

  return (
    <section className={classes}>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <CommentList comments={reviews} />
      {authStatus === AuthorizationStatus.Auth && <CommentForm hotelId={hotelId}/>}
    </section>
  );
};

export default Reviews;
