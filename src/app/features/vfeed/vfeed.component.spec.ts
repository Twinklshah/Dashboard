import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfeedComponent } from './vfeed.component';

describe('VfeedComponent', () => {
  let component: VfeedComponent;
  let fixture: ComponentFixture<VfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
