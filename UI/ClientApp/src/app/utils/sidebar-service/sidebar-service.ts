import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidebarService {
  public OnShowSidebar = new Subject<boolean>();

  public showSidebar(): void {
    this.OnShowSidebar.next(true);
  }

  public hideSidebar(): void {
    this.OnShowSidebar.next(false);
  }
}
