import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
  @Input() statusCode: string;
  @Input() reason: string;

  constructor(private _route: ActivatedRoute) {
    this.statusCode = this._route.snapshot.paramMap.get('statusCode');
    this.reason = this._route.snapshot.paramMap.get('reason');
  }
}
