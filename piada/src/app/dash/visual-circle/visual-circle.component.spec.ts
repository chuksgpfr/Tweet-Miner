import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCircleComponent } from './visual-circle.component';

describe('VisualCircleComponent', () => {
  let component: VisualCircleComponent;
  let fixture: ComponentFixture<VisualCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
