const productsPerPage = 6;

export class Filter {
  constructor (public productCount: number = 6) {}

  public incProductsCount() {
    this.productCount += productsPerPage;
  }
}
