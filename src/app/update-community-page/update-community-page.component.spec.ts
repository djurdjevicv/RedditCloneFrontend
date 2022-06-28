import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommunityPageComponent } from './update-community-page.component';

describe('UpdateCommunityPageComponent', () => {
  let component: UpdateCommunityPageComponent;
  let fixture: ComponentFixture<UpdateCommunityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommunityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
