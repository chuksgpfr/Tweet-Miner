import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditapidetailsComponent } from './editapidetails.component';

describe('EditapidetailsComponent', () => {
  let component: EditapidetailsComponent;
  let fixture: ComponentFixture<EditapidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditapidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditapidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
