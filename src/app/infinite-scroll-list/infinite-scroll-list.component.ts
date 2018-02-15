import { Component, OnInit, ElementRef, OnDestroy, ViewChild, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-list',
  templateUrl: './infinite-scroll-list.component.html',
  styleUrls: ['./infinite-scroll-list.component.css']
})
export class InfiniteScrollListComponent implements OnInit, OnDestroy {
  private _scrollHandler = this.onScroll.bind(this);
  showLoader: boolean;
  @ViewChild('bottomElement') bottomElement: ElementRef;
  @Input() loadListElements: Function;
  @Input() listElementsLoaded: EventEmitter<boolean>;
  @Input() allListElementsLoaded: EventEmitter<boolean>;

  constructor(private _el: ElementRef) {
    this.showLoader = false;
  }

  ngOnInit() {
    document.addEventListener('scroll', this._scrollHandler);

    this.listElementsLoaded.subscribe(() => {
      this.showLoader = false;
      document.addEventListener('scroll', this._scrollHandler);
    });

    this.allListElementsLoaded.subscribe(value => {
      if (value) {
        document.removeEventListener('scroll', this._scrollHandler);
      }
    });
  }

  ngOnDestroy () {
    document.removeEventListener('scroll', this._scrollHandler);
  }

  onScroll (e) {
    if (this.bottomElement.nativeElement.offsetTop > window.innerHeight + window.scrollY) {
      return true;
    }
    this.showLoader = true;
    document.removeEventListener('scroll', this._scrollHandler);
    this.loadListElements();
  }
}
