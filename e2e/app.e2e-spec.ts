import { DemoShopPage } from './app.po';

describe('demo-shop App', function() {
  let page: DemoShopPage;

  beforeEach(() => {
    page = new DemoShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
