import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourfolderComponent } from './yourfolder.component';

describe('YourfolderComponent', () => {
  let component: YourfolderComponent;
  let fixture: ComponentFixture<YourfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
