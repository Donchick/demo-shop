import { Gender } from './models/gender';

export class Product {

  constructor (public id: number, public categoryId: number, public imageSrc: string, public name: string, public description: string,
               public cost: number, public rating: number, public gender: Gender, public count: number, public soldCount: number) {
  }
}
