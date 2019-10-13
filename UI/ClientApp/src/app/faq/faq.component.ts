import { Title } from "@angular/platform-browser";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SidebarService } from "../utils/sidebar-service/sidebar-service";

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.titleService.setTitle('Najczęściej zadawane pytania - Szpek.pl');
    this.sidebarService.showSidebar();
  }

  ngOnDestroy(): void {
    this.sidebarService.hideSidebar();
  }

  constructor(private titleService: Title, private sidebarService: SidebarService) { }  
}
