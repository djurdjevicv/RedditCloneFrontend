import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommunityCardComponent } from './update-community-card.component';

describe('UpdateCommunityCardComponent', () => {
  let component: UpdateCommunityCardComponent;
  let fixture: ComponentFixture<UpdateCommunityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommunityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
