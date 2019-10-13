import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { SidebarService } from "../utils/sidebar-service/sidebar-service";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.titleService.setTitle('Kontakt - Szpek.pl');
    this.sidebarService.showSidebar();
  }

  ngOnDestroy(): void {
    this.sidebarService.hideSidebar();
  }

  constructor(private titleService: Title, private sidebarService: SidebarService) { }
}
