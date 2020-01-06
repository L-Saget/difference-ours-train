import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDeviceComponent } from './map-device.component';

describe('MapDeviceComponent', () => {
  let component: MapDeviceComponent;
  let fixture: ComponentFixture<MapDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
