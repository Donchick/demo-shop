const productsPerPage = 6;

export class Filter {
  constructor (public availableOnly?: boolean, public gender?: string, public category?: string,
               public ratingFrom?: number, public ratingFor?: number, public priceFrom?: number,
               public priceTo?: number) {}
}
