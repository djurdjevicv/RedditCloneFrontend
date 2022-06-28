import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPostCardComponent } from './block-post-card.component';

describe('BlockPostCardComponent', () => {
  let component: BlockPostCardComponent;
  let fixture: ComponentFixture<BlockPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockPostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
