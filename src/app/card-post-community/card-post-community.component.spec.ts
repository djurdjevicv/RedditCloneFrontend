import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPostCommunityComponent } from './card-post-community.component';

describe('CardPostCommunityComponent', () => {
  let component: CardPostCommunityComponent;
  let fixture: ComponentFixture<CardPostCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPostCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPostCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
