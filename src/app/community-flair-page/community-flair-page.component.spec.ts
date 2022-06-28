import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFlairPageComponent } from './community-flair-page.component';

describe('CommunityFlairPageComponent', () => {
  let component: CommunityFlairPageComponent;
  let fixture: ComponentFixture<CommunityFlairPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityFlairPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFlairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
