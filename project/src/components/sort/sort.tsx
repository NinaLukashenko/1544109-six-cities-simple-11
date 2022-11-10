import { MouseEvent, useState } from 'react';
import { SortOption, sortOptions } from '../../consts/sort';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortOption } from '../../store/action';

const Sort = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useAppSelector((state) => state.sort);

  const dispatch = useAppDispatch();

  const handleSortByClick = (evt: MouseEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    setIsOpen((state) => !state);
  };

  const handleSortOptionSelect = (evt: MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    const el = evt.target as HTMLLIElement;

    dispatch(changeSortOption(el.textContent as SortOption));
    setIsOpen((state) => false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortByClick}>
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
        onClick={handleSortOptionSelect}
      > {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
            tabIndex={0}
          >{option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Sort;
