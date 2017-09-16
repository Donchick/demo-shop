import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/styles/components-styles/buttons-styles.css',
    '../assets/styles/reset_css.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';
}
