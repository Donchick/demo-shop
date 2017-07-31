
export class Product {

  constructor (public id: number, public categoryId: number, public imageSrc: string, public name: string, public description: string,
               public cost: number, public rating: number, public gender: number, public count: number, public soldCount: number) {
  }
}
