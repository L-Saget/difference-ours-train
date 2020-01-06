import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDifferenceComponent } from './add-difference.component';

describe('AddDifferenceComponent', () => {
  let component: AddDifferenceComponent;
  let fixture: ComponentFixture<AddDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDifferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
