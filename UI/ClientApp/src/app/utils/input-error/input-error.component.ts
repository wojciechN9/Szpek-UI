import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  providers: []
})
export class InputError {
  @Input("control")
  control: any;
}
