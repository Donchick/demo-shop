import { Gender } from './gender';

export interface IProductsFilter {
  availableOnly: boolean;
  gender: Gender;
  ratingFrom: number;
  ratingTo: number;
  priceFrom: number;
  priceTo: number;
  categoryId?: number;
}
