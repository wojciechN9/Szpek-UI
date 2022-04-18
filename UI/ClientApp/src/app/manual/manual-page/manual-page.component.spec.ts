import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManualPageComponent } from './manual-page.component';

describe('ManualPageComponent', () => {
  let component: ManualPageComponent;
  let fixture: ComponentFixture<ManualPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
