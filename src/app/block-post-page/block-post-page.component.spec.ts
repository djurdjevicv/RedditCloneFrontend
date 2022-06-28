import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPostPageComponent } from './block-post-page.component';

describe('BlockPostPageComponent', () => {
  let component: BlockPostPageComponent;
  let fixture: ComponentFixture<BlockPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
