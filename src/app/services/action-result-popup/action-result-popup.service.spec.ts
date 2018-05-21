/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionResultPopupService } from './action-result-popup.service';

describe('ActionResultPopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionResultPopupService]
    });
  });

  it('should ...', inject([ActionResultPopupService], (service: ActionResultPopupService) => {
    expect(service).toBeTruthy();
  }));
});
