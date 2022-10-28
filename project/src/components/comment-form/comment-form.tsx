import { ChangeEvent, useState } from 'react';
import { StarRating } from '../../const';

export const CommentForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    rating: StarRating.None,
    review: '',
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((state) => {
      const { name, value } = evt.target;
      return ({...formData, [name]: value });
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={StarRating.FiveStars}
          id="5-stars"
          type="radio"
          checked={formData.rating >= StarRating.FiveStars}
          onChange={handleInputChange}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
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
          checked={formData.rating >= StarRating.FourStars}
          onChange={handleInputChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
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
          checked={formData.rating >= StarRating.ThreeStars}
          onChange={handleInputChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
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
          checked={formData.rating >= StarRating.TwoStars}
          onChange={handleInputChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
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
          checked={formData.rating >= StarRating.OneStar}
          onChange={handleInputChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
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
        onChange={handleInputChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};
