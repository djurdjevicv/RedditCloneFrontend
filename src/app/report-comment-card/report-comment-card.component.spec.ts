import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentCardComponent } from './report-comment-card.component';

describe('ReportCommentCardComponent', () => {
  let component: ReportCommentCardComponent;
  let fixture: ComponentFixture<ReportCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCommentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
