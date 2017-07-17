
export class Product {
  id: number;
  categoryId: number;
  image: string;
  name: string;
  description: string;
  cost: number;
  rating: number;
  gender: number;
  count: number;
  soldCount: number;

  constructor (id: number, categoryId: number, image: string, name: string, description: string,
               cost: number, rating: number, gender: number, count: number, soldCount: number) {
    this.categoryId = categoryId;
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.rating = rating;
    this.gender = gender;
    this.count = count;
    this.soldCount = soldCount;
  }
}
