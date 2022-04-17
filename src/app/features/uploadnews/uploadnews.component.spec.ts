import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadnewsComponent } from './uploadnews.component';

describe('UploadnewsComponent', () => {
  let component: UploadnewsComponent;
  let fixture: ComponentFixture<UploadnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadnewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
