import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulltweetsComponent } from './pulltweets.component';

describe('PulltweetsComponent', () => {
  let component: PulltweetsComponent;
  let fixture: ComponentFixture<PulltweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulltweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulltweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
