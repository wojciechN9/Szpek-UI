import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'location-modal',
  templateUrl: './location-modal.component.html'
})
export class LocationModalComponent implements OnInit {
  @Input() locationId = "";
  @Input() address = "";
  @Input() pm10Value = "";
  @Input() pm25Value = "";
  @Input() periodTo = "";

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
