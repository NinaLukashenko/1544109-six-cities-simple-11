export enum SortOption {
  Popular = 'Popular',
  PriceFromLowToHigh = 'Price: low to high',
  PriceFromHighLow = 'Price: high to low',
  Rating = 'Top rated first',
}

export const DEFAULT_SORT_OPTION = SortOption.Popular;

export const sortOptions = Object.values(SortOption);
