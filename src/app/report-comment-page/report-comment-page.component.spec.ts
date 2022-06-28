import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentPageComponent } from './report-comment-page.component';

describe('ReportCommentPageComponent', () => {
  let component: ReportCommentPageComponent;
  let fixture: ComponentFixture<ReportCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCommentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
