import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingOverlayComponent} from '../loading-overlay/loading-overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent]
})
export class SharedModule { }
