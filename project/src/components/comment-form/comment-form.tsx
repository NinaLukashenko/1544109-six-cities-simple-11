import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { StarRating } from '../../consts/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFormResetingStatus } from '../../store/actions';
import { saveCommentAction } from '../../store/api-actions';
import { isCommentLengthCorrect, isNotEmpty, isRated } from '../../utils/utils';

const defaultFormData = {
  rating: StarRating.None,
  review: '',
};

type CommentFormProps = {
  hotelId: number;
}

export const CommentForm = ({ hotelId }: CommentFormProps): JSX.Element => {
  const [formData, setFormData] = useState(defaultFormData);

  const isFormValid = isRated(formData.rating) && isNotEmpty(formData.review) && isCommentLengthCorrect(formData.review);

  const isSendingComment = useAppSelector((state) => state.isCommentSending);
  const isResetingForm = useAppSelector((state) => state.isResetingCommentForm);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isResetingForm) {
      setFormData((state) => (defaultFormData));
      dispatch(setFormResetingStatus(false));
    }
  }, [dispatch, isResetingForm]);

  const handleRateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((state) => ({ ...formData, rating: Number(evt.target.value) }));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((state) => {
      const { name, value } = evt.target;
      return ({ ...formData, [name]: value });
    });
  };

  const handleFormSubmit = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const reviewData = {
      hotelId,
      rating: formData.rating,
      review: formData.review,
    };

    dispatch(saveCommentAction(reviewData));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.FiveStars}
          id="5-stars"
          type="radio"
          checked={formData.rating === StarRating.FiveStars}
          onChange={handleRateChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          style={{ pointerEvents: isSendingComment ? 'none' : 'auto' }}
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.FourStars}
          id="4-stars"
          type="radio"
          checked={formData.rating === 4}
          onChange={handleRateChange}

        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          style={{ pointerEvents: isSendingComment ? 'none' : 'auto' }}
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.ThreeStars}
          id="3-stars"
          type="radio"
          checked={formData.rating === StarRating.ThreeStars}
          onChange={handleRateChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          style={{ pointerEvents: isSendingComment ? 'none' : 'auto' }}
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.TwoStars}
          id="2-stars"
          type="radio"
          checked={formData.rating === StarRating.TwoStars}
          onChange={handleRateChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          style={{ pointerEvents: isSendingComment ? 'none' : 'auto' }}
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.OneStar}
          id="1-star"
          type="radio"
          checked={formData.rating === StarRating.OneStar}
          onChange={handleRateChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          style={{ pointerEvents: isSendingComment ? 'none' : 'auto' }}
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
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
