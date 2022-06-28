import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePostWithCommentsComponent } from './one-post-with-comments.component';

describe('OnePostWithCommentsComponent', () => {
  let component: OnePostWithCommentsComponent;
  let fixture: ComponentFixture<OnePostWithCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePostWithCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePostWithCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
