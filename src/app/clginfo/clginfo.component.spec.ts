import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClginfoComponent } from './clginfo.component';

describe('ClginfoComponent', () => {
  let component: ClginfoComponent;
  let fixture: ComponentFixture<ClginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClginfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
