import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCommunityPageComponent } from './block-community-page.component';

describe('BlockCommunityPageComponent', () => {
  let component: BlockCommunityPageComponent;
  let fixture: ComponentFixture<BlockCommunityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCommunityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
