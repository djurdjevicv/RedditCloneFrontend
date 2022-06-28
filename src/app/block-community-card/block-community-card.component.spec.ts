import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCommunityCardComponent } from './block-community-card.component';

describe('BlockCommunityCardComponent', () => {
  let component: BlockCommunityCardComponent;
  let fixture: ComponentFixture<BlockCommunityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCommunityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCommunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
