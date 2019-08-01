import { Title } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  ngOnInit(): void {
    this.titleService.setTitle('Najczęściej zadawane pytania - Szpek.pl');
  }

  constructor(private titleService: Title) { }
}
