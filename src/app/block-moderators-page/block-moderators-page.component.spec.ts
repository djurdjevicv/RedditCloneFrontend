import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockModeratorsPageComponent } from './block-moderators-page.component';

describe('BlockModeratorsPageComponent', () => {
  let component: BlockModeratorsPageComponent;
  let fixture: ComponentFixture<BlockModeratorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockModeratorsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockModeratorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
