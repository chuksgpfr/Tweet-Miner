import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApidetailsComponent } from './apidetails.component';

describe('ApidetailsComponent', () => {
  let component: ApidetailsComponent;
  let fixture: ComponentFixture<ApidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
