import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent {
  ngOnInit(): void {
    this.titleService.setTitle('Kontakt - Szpek.pl');
  }

  constructor(private titleService: Title) { }
}
