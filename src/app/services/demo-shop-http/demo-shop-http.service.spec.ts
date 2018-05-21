/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DemoShopHttpService } from './demo-shop-http.service';

describe('DemoShopHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoShopHttpService]
    });
  });

  it('should ...', inject([DemoShopHttpService], (service: DemoShopHttpService) => {
    expect(service).toBeTruthy();
  }));
});
