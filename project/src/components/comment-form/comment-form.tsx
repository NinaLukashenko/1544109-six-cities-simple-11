import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { starRates, StarRateValue } from '../../consts/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveCommentAction } from '../../store/api-actions';
import { setFormResetingStatus } from '../../store/current-offer-data/current-offer-data';
import { getIsCommentSending, getIsResetingCommentForm } from '../../store/current-offer-data/selectors';
import { isCommentLengthCorrect, isNotEmpty, isRated } from '../../utils/utils';
import { StarRating } from '../star-rating/star-rating';

type CommentFormProps = {
  hotelId: number;
}

const CommentForm = ({ hotelId }: CommentFormProps): JSX.Element => {
  const [rating, setRating] = useState(StarRateValue.None);
  const [review, setReview] = useState('');

  const isFormValid = isRated(rating) && isNotEmpty(review) && isCommentLengthCorrect(review);

  const isSendingComment = useAppSelector(getIsCommentSending);
  const isResetingForm = useAppSelector(getIsResetingCommentForm);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isResetingForm) {
      setRating((state) => StarRateValue.None);
      setReview((state) => '');
      dispatch(setFormResetingStatus(false));
    }
  }, [dispatch, isResetingForm]);

  const handleRateChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setRating((state) => Number(evt.target.value));
    }, []
  );

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview((state) => evt.target.value);
  };

  const handleFormSubmit = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(saveCommentAction({ hotelId, rating, review }));
  };

  const ratesList = useMemo<JSX.Element[]>((): JSX.Element[] => (
    starRates.map((rate) => (
      <StarRating
        key={rate.value}
        value={rate.value}
        title={rate.title}
        isChecked={rating === rate.value}
        isDisabled={isSendingComment}
        onRateChange={handleRateChange}
      />
    ))
  ), [rating, isSendingComment, handleRateChange]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      data-testid="form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratesList}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        disabled={isSendingComment}
        onChange={handleCommentChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          style={{ pointerEvents: !isFormValid || isSendingComment ? 'none' : 'auto' }}
          type="submit"
          disabled={!isFormValid || isSendingComment}
        >Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
