import { Component } from "@angular/core";

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  public pendingChanges = 0;

  public addChange() {
    this.pendingChanges++;
  }

  public removeChange() {
    this.pendingChanges--;
  }

  public error() {
    this.pendingChanges = 0;
    console.error('błąd ładowania w progress-bar');
  }
}
