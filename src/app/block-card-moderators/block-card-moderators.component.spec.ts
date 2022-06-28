import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCardModeratorsComponent } from './block-card-moderators.component';

describe('BlockCardModeratorsComponent', () => {
  let component: BlockCardModeratorsComponent;
  let fixture: ComponentFixture<BlockCardModeratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCardModeratorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCardModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
