import { Gender } from './gender';

export interface IProduct {
  id: number,
  categoryId: number,
  imageSrc: string,
  name: string,
  description: string,
  cost: number,
  rating: number,
  gender: Gender,
  count: number,
  soldCount: number
}
