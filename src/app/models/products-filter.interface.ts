import { Gender } from './gender';
import { ICategory } from './category.interface';
import { IRange } from './range.interface';

export interface IProductsFilter {
  availableOnly: boolean;
  gender: Gender;
  rating: IRange,
  price: IRange,
  category: ICategory;
}
