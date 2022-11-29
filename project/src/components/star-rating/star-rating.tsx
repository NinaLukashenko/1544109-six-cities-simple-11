import { ChangeEvent, memo } from 'react';

type StarRatingProps = {
  value: number;
  title: string;
  isChecked: boolean;
  isDisabled: boolean;
  onRateChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const StarRating = ({ value, title, isChecked, isDisabled, onRateChange }: StarRatingProps): JSX.Element => (
  <>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={value}
      id={`${value}-stars`}
      type="radio"
      checked={isChecked}
      onChange={onRateChange}
    />
    <label
      htmlFor={`${value}-stars`}
      className="form__rating-label"
      style={{
        pointerEvents: isDisabled ? 'none' : 'auto'
      }}
      title={title}
    >
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

export default memo(StarRating);
