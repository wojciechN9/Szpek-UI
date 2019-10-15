import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationMeassurements } from './location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';
import { SidebarService } from '../utils/sidebar-service/sidebar-service';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent implements OnInit, OnDestroy {
  public locationsMeassurements: LocationMeassurements[];
  private loaderActive = true;

  ngOnInit(): void {
    this.titleService.setTitle('Jakość i stan powietrza w twojej miejscowości, mapa  - Szpek.pl');
    this.sidebarService.showSidebar();
  }

  ngOnDestroy(): void {
    this.sidebarService.hideSidebar();
  }

  constructor(
    meassurementsService: MeassurementsHttpService,
    private titleService: Title,
    private readonly sidebarService: SidebarService) {

    meassurementsService.getLocationsMeassures().subscribe(
      result => {
        this.locationsMeassurements = result;
        this.loaderActive = false;
      });

    
  }
}
